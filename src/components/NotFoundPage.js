import classes from "./NotFoundPage.module.css";
import imageNotFound from "../images/404.png";
const NotFoundPage = () => {
  return (
    <div className={classes.page__not_found}>
      <h1>No se encontró la página. Error 404</h1>
      <img
        src={imageNotFound}
        alt="No se ha encontrado la pagina"
        width="600"
        height="auto"
      />
    </div>
  );
};

export default NotFoundPage;
