import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classes from "./NavBar.module.css";
import { authActions } from "../store/auth";
import logoImg from "../images/Logo.png";
import IconUserMenu from "./UI/Icons/IconUserMenu";
import IconCart from "./UI/Icons/IconCart";
import IconBurgerMenu from "./UI/Icons/IconBurgerMenu";
const NavBar = (props) => {
  const [mobileNav, setmobileNav] = useState(false);
  const { isLogged, typeUser, userStatus } = useSelector((state) => state.auth);
  const [animation, setAnimation] = useState(`${classes.cart_badge}`);

  useEffect(() => {
    setAnimation((prevState) =>
      prevState.concat(" ", `${classes.cart_badge_changed}`)
    );
    return () => {
      setTimeout(() => {
        setAnimation(`${classes.cart_badge}`);
      }, 1000);
    };
  }, [props.totalAmount]);

  const ROUTES = [
    { path: "/menu", namePath: "Menú", access: isLogged && typeUser === 1 },
    {
      path: "/shopping",
      namePath: "Compras",
      access: isLogged && typeUser === 1,
    },
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
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.navbar}>
      <div className={classes.navbar__logo}>
        <Link to="/">
          <img
            className={classes.img_logo}
            src={logoImg}
            width="100px"
            height="auto"
            alt="Logo chicks restaurants"
          />
        </Link>
      </div>
      <nav className={classes.main_nav}>
        <div className="dropdown">
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <IconUserMenu />
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            {ROUTES.map(
              (route, index) =>
                route.access && (
                  <li key={index}>
                    <Link className="dropdown-item" to={route.path}>
                      {route.namePath}
                    </Link>
                  </li>
                )
            )}
            {isLogged && (
              <li onClick={logout}>
                <button className="dropdown-item">Cerrar Sesión</button>
              </li>
            )}
            {isLogged && userStatus && (
              <li className={classes.cart}>
                <span onClick={props.openModal}>
                  <div className={`${animation}`}>{props.totalAmount}</div>
                  <IconCart />
                </span>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <span onClick={openMobileNav} className={classes.mobile_icon}>
        <IconBurgerMenu />
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
            {isLogged && userStatus && (
              <li className={classes.cart}>
                <span onClick={props.openModal}>
                  <IconCart />
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
