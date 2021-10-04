import React, { Fragment, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Auth/Register";
import Cart from "./components/Cart/Cart";
import Modal from "./components/UI/Modal";
import ProfileUser from "./pages/ProfileUser";
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard";
import AccountDisabled from "./pages/Auth/AccountDisabled";
import ResetPassword from "./pages/Auth/ResetPassword";
import NewPassword from "./pages/Auth/NewPassword";
import Menu from "./pages/Menu";
import Order from "./pages/Order";

const App = () => {
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);
  const { isLogged, typeUser, userStatus, clientDocId } = useSelector(
    (state) => state.auth
  );
  const { totalAmount, orderRequested } = useSelector((state) => state.cart);
  const accountDisabled = isLogged && !userStatus;
  return (
    <Fragment>
      {show && (
        <Modal show={show} size="small_card">
          <Cart closeModal={closeModal} />
        </Modal>
      )}
      <NavBar openModal={openModal} totalAmount={totalAmount} />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/account-disabled">
          {accountDisabled && <AccountDisabled />}
          {!accountDisabled && <Redirect to="/" />}
        </Route>
        <Route path="/login">
          {accountDisabled && <Redirect to="/account-disabled" />}
          {!isLogged && <Login />}
          {isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/register">
          {accountDisabled && <Redirect to="/account-disabled" />}
          {!isLogged && <Register />}
          {isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/profile">
          {accountDisabled && <Redirect to="/account-disabled" />}
          {isLogged && <ProfileUser />}
          {!isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/reset-password" exact>
          {accountDisabled && <Redirect to="/account-disabled" />}
          {!isLogged && <ResetPassword />}
          {isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/dashboard">
          {accountDisabled && <Redirect to="/account-disabled" />}
          {isLogged && <Dashboard />}
          {!isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/menu" exact>
          {accountDisabled && <Redirect to="/account-disabled" />}
          {isLogged && <Menu />}
          {!isLogged && <Redirect to="/" />}
        </Route>
        <Route path="/order">
          {accountDisabled && <Redirect to="/account-disabled" />}
          {orderRequested &&
            totalAmount !== 0 &&
            typeUser === 1 &&
            clientDocId.length === 0 && <Order />}
          {orderRequested &&
            totalAmount !== 0 &&
            typeUser > 1 &&
            clientDocId.length > 0 && <Order />}
          {totalAmount === 0 && <Redirect to="/" />}
        </Route>
        <Route path="/reset-password/:token">
          <NewPassword />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Fragment>
  );
};

export default App;
