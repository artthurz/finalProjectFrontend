import React, { Component } from "react";
import api from "../../services/api";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import { Link } from "react-router-dom";

import "./styles.css";

const schema = Yup.object().shape({
  name: Yup.string(),
  gender: Yup.string(),
  age: Yup.number(),
  email: Yup.string(),
});

export default class People extends Component {
  state = {
    people: {},
    showEdit: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/peoples/${id}`);

    this.setState({ people: response.data });
  }

  handleDelete = async () => {
    const { id } = this.props.match.params;

    const response = await api.delete(`/peoples/${id}`);
    window.location.reload();
  };

  handleShowEdit = () => {
    const showEdit = this.state.showEdit;

    if (showEdit === true) {
      this.setState({ showEdit: false });
      console.log(showEdit);
    } else {
      this.setState({ showEdit: true });
      console.log(showEdit);
    }
  };

  handleUpdate = async (data, { resetForm }) => {
    const { id } = this.props.match.params;
    const response = await api.put(`/peoples/${id}`, data);
    resetForm();
    window.location.reload();
    this.setState({ showEdit: false });
  };

  render() {
    const { people, showEdit } = this.state;

    return (
      <div>
        <div className="people-info">
          <h1>{people.name}</h1>
          <p>Gênero: {people.gender}</p>
          <p>Idade: {people.age}</p>
          <p>Email: {people.email}</p>
          <div className="actions">
            <div className="edit">
              <Link onClick={this.handleShowEdit}>Editar</Link>
            </div>
            <div className="delete">
              <Link to={`/`} onClick={this.handleDelete}>
                Deletar
              </Link>
            </div>
          </div>
          <div className="form" style={showEdit ? {} : { display: "none" }}>
            <Form
              initialData={people}
              schema={schema}
              onSubmit={this.handleUpdate}
            >
              <Input name="name" placeholder="Nome" />
              <Input name="gender" placeholder="Gênero" />
              <Input name="age" placeholder="Idade" />
              <Input name="email" placeholder="Email" />

              <button type="submit">Salvar Edição</button>
            </Form>
          </div>
        </div>
        <div className="back">
          <Link to={`/peoples`}>Voltar</Link>
        </div>
      </div>
    );
  }
}
