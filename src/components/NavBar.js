import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import actionTypes from "../store/actionsType";
import classes from "./NavBar.module.css";
const NavBar = (props) => {
  const [mobileNav, setmobileNav] = useState(false);
  const { isLogged, typeUser, userStatus } = useSelector(
    (state) => state.userData
  );
  const ROUTES = [
    { path: "/login", namePath: "Iniciar Sesión", access: !isLogged },
    { path: "/register", namePath: "Registrarse", access: !isLogged },
    {
      path: "/account-disabled",
      namePath: "Cuenta",
      access: isLogged && !userStatus,
    },
    {
      path: "/dashboard",
      namePath: "Dashboard",
      access: isLogged && typeUser !== 1 && userStatus,
    },
    { path: "/profile", namePath: "Perfil", access: isLogged && userStatus },
  ];
  const openMobileNav = () => {
    setmobileNav((prevState) => !prevState);
  };

  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: actionTypes.LOGOUT });
  };

  return (
    <header className={classes.navbar}>
      <div className={classes.navbar__logo}>
        <Link to="/">
          <h2>ChickRest</h2>
        </Link>
      </div>
      <nav className={classes.main_nav}>
        <ul>
          {ROUTES.map(
            (route, index) =>
              route.access && (
                <li key={index} className={classes.links}>
                  <Link to={route.path}>{route.namePath}</Link>
                </li>
              )
          )}
          {isLogged && (
            <li className={classes.links} onClick={logout}>
              Cerrar Sesión
            </li>
          )}
          {isLogged && typeUser === 1 && userStatus && (
            <li className={classes.cart}>
              <span onClick={props.openModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                </svg>
              </span>
            </li>
          )}
        </ul>
      </nav>
      <span onClick={openMobileNav} className={classes.mobile_icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
        </svg>
      </span>
      {mobileNav && (
        <nav className={classes.mobile_nav}>
          <ul>
            {ROUTES.map(
              (route, index) =>
                route.access && (
                  <li key={index}>
                    <Link to={route.path}>{route.namePath}</Link>
                  </li>
                )
            )}
            {isLogged && <li onClick={logout}>Cerrar Sesión</li>}
            {isLogged && typeUser === 1 && userStatus && (
              <li className={classes.cart}>
                <span onClick={props.openModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
                  </svg>
                </span>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};
export default NavBar;
