import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/main";
import MainProduct from "./pages/mainProduct";
import Product from "./pages/product";
import MainPeople from "./pages/mainPeople";
import People from "./pages/people";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/products" component={MainProduct} />
      <Route path="/products/details/:id" component={Product} />
      <Route exact path="/peoples" component={MainPeople} />
      <Route path="/peoples/details/:id" component={People} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
