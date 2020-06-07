import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./styles.css";

export default class MainPeople extends Component {
  render() {
    return (
      <div className="main">
        <Link to={`/peoples`}>Pessoas</Link>
        <Link to={`/products`}>Produtos</Link>
      </div>
    );
  }
}
