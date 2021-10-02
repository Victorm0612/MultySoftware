import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import ProductsPage from "./Dashboard/ProductsPage";
import CategoriesPage from "./Dashboard/CategoriesPage";
import RestaurantsPage from "./Dashboard/RestaurantsPage";
import classes from "./DashboardPage.module.css";
import DiscountsPage from "./Dashboard/DiscountsPage";
import UsersPage from "./Dashboard/UsersPage";
import SalesPage from "./Dashboard/SalesPage";
const DashboardPage = () => {
  let { path, url } = useRouteMatch();
  const ROUTES = [
    {
      path: `${url}/products`,
      pathName: "Productos",
      access: true,
    },
    {
      path: `${url}/categories`,
      pathName: "Categorías",
      access: true,
    },
    {
      path: `${url}/discounts`,
      pathName: "Descuentos",
      access: true,
    },
    {
      path: `${url}/users`,
      pathName: "Usuarios",
      access: true,
    },
    { path: `${url}/sales`, pathName: "Ventas", access: true },
    {
      path: `${url}/restaurants`,
      pathName: "Sedes",
      access: true,
    },
  ];
  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboard__menu}>
        <ul>
          {ROUTES.map(
            (route, index) =>
              route.access && (
                <li key={index}>
                  <Link to={route.path}>{route.pathName}</Link>
                </li>
              )
          )}
        </ul>
      </div>
      <Switch>
        <Route exact path={path}>
          <div className={classes.dashboard__main}>
            <div>Modulo 1</div>
            <div>Modulo 2</div>
            <div>Modulo 3</div>
            <div>Modulo 4</div>
          </div>
        </Route>
        <Route path={`${path}/products`}>
          <ProductsPage />
        </Route>
        <Route path={`${path}/categories`}>
          <CategoriesPage />
        </Route>
        <Route path={`${path}/discounts`}>
          <DiscountsPage />
        </Route>
        <Route path={`${path}/users`}>
          <UsersPage />
        </Route>
        <Route path={`${path}/sales`}>
          <SalesPage />
        </Route>
        <Route path={`${path}/restaurants`}>
          <RestaurantsPage />
        </Route>
      </Switch>
    </div>
  );
};

export default DashboardPage;
