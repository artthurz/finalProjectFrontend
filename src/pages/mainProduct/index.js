import React, { Component } from "react";
import api from "../../services/api";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";
import * as Yup from "yup";

import "./styles.css";

const schema = Yup.object().shape({
  title: Yup.string(),
  description: Yup.string(),
  url: Yup.string(),
});

export default class MainProduct extends Component {
  state = {
    products: [],
    productInfo: {},
    page: 1,
    showProductList: true,
    showCreatePage: false,
  };

  componentDidMount() {
    this.loadProducts();
  }
  loadProducts = async (page = 1) => {
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;

    this.setState({ products: docs, productInfo, page });
  };

  prevPage = () => {
    const { page, productInfo } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  };
  nextPage = () => {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  };

  handleShowCreate = () => {
    const showProductList = this.state.showProductList;

    if (showProductList === true) {
      this.setState({ showProductList: false });
      this.setState({ showCreatePage: true });
    } else if (showProductList === false) {
      this.setState({ showProductList: true });
      this.setState({ showCreatePage: false });
    }
  };
  handleCreate = async (data, { resetForm }) => {
    const response = await api.post(`/products`, data);
    resetForm();
    this.handleShowCreate();
    window.location.reload();
  };

  render() {
    const {
      products,
      page,
      productInfo,
      showProductList,
      showCreatePage,
    } = this.state;
    return (
      <div className="main">
        <div
          className="product-list"
          style={showProductList ? {} : { display: "none" }}
        >
          <div className="createButton">
            <button onClick={this.handleShowCreate}>Adicionar Produto</button>
          </div>
          {products.map((product) => (
            <article key={product._id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p>
              <Link to={`/products/details/${product._id}`}>Acessar</Link>
            </article>
          ))}
          <div className="actions">
            <button disabled={page === 1} onClick={this.prevPage}>
              Anterior
            </button>
            <button
              disabled={page === productInfo.pages}
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
              <Input name="title" placeholder="Título" />
              <Input name="description" placeholder="Descrição" />
              <Input name="url" placeholder="URL" />

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
