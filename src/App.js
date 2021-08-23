import React, { Fragment, useState } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Cart from "./components/Cart/Cart";
const App = () => {
  const [show, setShow] = useState(false);
  const openCart = () => {
    setShow(true);
  };
  const closeCart = () => {
    setShow(false);
  };
  return (
    <Fragment>
      {show && <Cart openCart={openCart} closeCart={closeCart} />}
      <NavBar openCart={openCart} closeCart={closeCart} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
