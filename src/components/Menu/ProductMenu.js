import classes from "./MenuPage.module.css";
import Button from "../UI/Button";
import { useState } from "react";
import { cartActions } from "../../store/cart";
import { useDispatch } from "react-redux";

const ProductMenu = (props) => {
  const [seeMore, setSeeMore] = useState(false);
  const dispatch = useDispatch();

  const onChangeSeeMore = (e) => {
    e.preventDefault();
    setSeeMore((prevState) => !prevState);
  };

  const addProductToCart = (e) => {
    e.preventDefault();
    dispatch(
      cartActions.addProduct({
        product_id: props.id,
        pro_name: props.title,
        price: props.price,
        tax: props.tax,
        discounts: props.discounts,
        amount: 1,
      })
    );
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
          <Button action={addProductToCart} isInvalid={!props.productStatus}>
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
