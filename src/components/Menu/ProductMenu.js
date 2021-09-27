import classes from "./MenuPage.module.css";
import Button from "../UI/Button";
import { useState } from "react";
const ProductMenu = (props) => {
  const [seeMore, setSeeMore] = useState(false);
  const onChangeSeeMore = (e) => {
    e.preventDefault();
    setSeeMore((prevState) => !prevState);
  };
  return (
    <div className={`col-md-3 ${classes.column}`}>
      {!props.productStatus && (
        <div className={classes.badge_status}>No disponible</div>
      )}
      <div className={`${classes.card} card`}>
        <div className={classes.image_box}>
          <img src={props.image} className="card-img-top" alt="..." />
        </div>
        <div className={`card-body ${classes.body}`}>
          <h5 className="card-title">{props.title}</h5>
          <span className={`badge rounded-pill bg-primary ${classes.badge}`}>
            {props.categories.cat_name}
          </span>
          {props.discounts.map((discount) => (
            <span
              key={discount.id}
              className={`badge rounded-pill bg-primary ${classes.badge}`}
            >
              {discount.discount_name}
            </span>
          ))}
          <p className={`card-text ${!seeMore && classes.text}`}>
            {props.description}
          </p>
          <span className={classes.see_more} onClick={onChangeSeeMore}>
            ver más...
          </span>
          <p className={`${classes.price}`}>
            ${" "}
            {new Intl.NumberFormat("es-CO", {
              maximumSignificantDigits: 3,
            }).format(props.price)}
          </p>
          <Button isInvalid={!props.productStatus}>Agregar</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
