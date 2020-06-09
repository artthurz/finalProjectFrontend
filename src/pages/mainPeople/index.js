import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import "./styles.css";

const schema = Yup.object().shape({
  name: Yup.string(),
  gender: Yup.string(),
  age: Yup.number(),
  email: Yup.string(),
});

export default class MainPeople extends Component {
  state = {
    peoples: [],
    peopleInfo: {},
    page: 1,
    showPeopleList: true,
    showCreatePage: false,
  };

  componentDidMount() {
    this.loadPeoples();
  }
  loadPeoples = async (page = 1) => {
    const response = await api.get(`/peoples?page=${page}`);

    const { docs, ...peopleInfo } = response.data;

    this.setState({ peoples: docs, peopleInfo, page });
  };

  prevPage = () => {
    const { page, peopleInfo } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadPeoples(pageNumber);
  };
  nextPage = () => {
    const { page, peopleInfo } = this.state;

    if (page === peopleInfo.pages) return;

    const pageNumber = page + 1;

    this.loadPeoples(pageNumber);
  };

  handleShowCreate = () => {
    const showPeopleList = this.state.showPeopleList;

    if (showPeopleList === true) {
      this.setState({ showPeopleList: false });
      this.setState({ showCreatePage: true });
    } else if (showPeopleList === false) {
      this.setState({ showPeopleList: true });
      this.setState({ showCreatePage: false });
    }
  };
  handleCreate = async (data, { resetForm }) => {
    const response = await api.post(`/peoples`, data);
    resetForm();
    this.handleShowCreate();
    window.location.reload();
  };

  render() {
    const {
      peoples,
      page,
      peopleInfo,
      showPeopleList,
      showCreatePage,
    } = this.state;
    return (
      <div className="main">
        <div
          className="people-list"
          style={showPeopleList ? {} : { display: "none" }}
        >
          <div className="createButton">
            <button onClick={this.handleShowCreate}>Adicionar Pessoa</button>
          </div>
          {peoples.map((people) => (
            <article key={people._id}>
              <strong>{people.name}</strong>
              <p>{people.gender}</p>
              <Link to={`/peoples/details/${people._id}`}>Acessar</Link>
            </article>
          ))}
          <div className="actions">
            <button disabled={page === 1} onClick={this.prevPage}>
              Anterior
            </button>
            <button
              disabled={page === peopleInfo.pages}
              onClick={this.nextPage}
            >
              Próximo
            </button>
          </div>
          <div className="backButton">
            <Link to={`/`}>Voltar</Link>
          </div>
        </div>
        <div
          className="createPage"
          style={showCreatePage ? {} : { display: "none" }}
        >
          <div className="form">
            <Form schema={schema} onSubmit={this.handleCreate}>
              <Input name="name" placeholder="Nome" />
              <Input name="gender" placeholder="Gênero" />
              <Input name="age" placeholder="Idade" />
              <Input name="email" placeholder="Email" />

              <button type="submit">Adicionar</button>
            </Form>
          </div>
          <div className="backButton">
            <button onClick={this.handleShowCreate}>Voltar</button>
          </div>
        </div>
      </div>
    );
  }
}
