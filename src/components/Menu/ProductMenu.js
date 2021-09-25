import classes from "./MenuPage.module.css";
import Button from "../UI/Button";
const ProductMenu = (props) => {
  return (
    <div className="col-md-3">
      <div className={`${classes.card} card`}>
        <div className={classes.image_box}>
          <img src={props.image} className="card-img-top" alt="..." />
        </div>
        <div className={`card-body ${classes.body}`}>
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.description}</p>
          <p className={`${classes.price}`}>
            ${" "}
            {new Intl.NumberFormat("es-CO", {
              maximumSignificantDigits: 3,
            }).format(props.price)}
          </p>
          <Button>Agregar</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
