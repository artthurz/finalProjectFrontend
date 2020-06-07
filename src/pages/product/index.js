import React, { Component } from "react";
import api from "../../services/api";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import { Link } from "react-router-dom";

import "./styles.css";

const schema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
  url: Yup.string(),
});

export default class Product extends Component {
  state = {
    product: {},
    showEdit: false,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const response = await api.get(`/products/${id}`);

    this.setState({ product: response.data });
  }

  handleDelete = async () => {
    const { id } = this.props.match.params;

    const response = await api.delete(`/products/${id}`);
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
    const response = await api.put(`/products/${id}`, data);
    resetForm();
    window.location.reload();
    this.setState({ showEdit: false });
  };

  render() {
    const { product, showEdit } = this.state;

    return (
      <div>
        <div className="product-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <p>
            URL: <a href={product.url}>{product.url}</a>
          </p>
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
              initialData={product}
              schema={schema}
              onSubmit={this.handleUpdate}
            >
              <Input name="title" placeholder="Título" />
              <Input name="description" placeholder="Descrição" />
              <Input name="url" placeholder="URL" />

              <button type="submit">Salvar Edição</button>
            </Form>
          </div>
        </div>
        <div className="back">
          <Link to={`/products`}>Voltar</Link>
        </div>
      </div>
    );
  }
}
