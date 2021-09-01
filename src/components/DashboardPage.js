import { Link, Route, Switch, useRouteMatch } from "react-router-dom";
import ProductsPage from "./Dashboard/ProductsPage";
import CategoriesPage from "./Dashboard/CategoriesPage";
import CustomersPage from "./Dashboard/CustomersPage";
import OrdersPage from "./Dashboard/OrdersPage";
import RestaurantsPage from "./Dashboard/RestaurantsPage";
import classes from "./DashboardPage.module.css";
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
      path: `${url}/customers`,
      pathName: "Clientes",
      access: true,
    },
    { path: `${url}/orders`, pathName: "Ordenes", access: true },
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
        <Route path={`${path}/customers`}>
          <CustomersPage />
        </Route>
        <Route path={`${path}/orders`}>
          <OrdersPage />
        </Route>
        <Route path={`${path}/restaurants`}>
          <RestaurantsPage />
        </Route>
      </Switch>
    </div>
  );
};

export default DashboardPage;
