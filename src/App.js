import React, { Fragment, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Cart from "./components/Cart/Cart";
import Modal from "./components/UI/Modal";
import ProfileUser from "./pages/ProfileUser";
import { useSelector } from "react-redux";

const App = () => {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const isLogged = useSelector((state) => state.userData.isLogged);

  return (
    <Fragment>
      {show && (
        <Modal show={show}>
          <Cart closeModal={closeModal} />
        </Modal>
      )}
      <NavBar openModal={openModal} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login">
          {!isLogged && <Login />}
          {isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/register">
          {!isLogged && <Register />}
          {isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {!isLogged && <ProfileUser />}
          {isLogged && <Redirect to="/" />}
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
