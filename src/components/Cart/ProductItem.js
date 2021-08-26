import classes from "./ProductItem.module.css";
import Button from "../UI/Button";
const ProductItem = (props) => {
  return (
    <li className={classes["list-product"]}>
      <h2>{props.title}</h2>
      <div>
        <h4>
          $
          {new Intl.NumberFormat("es-CO", {
            maximumSignificantDigits: 3,
          }).format(props.price)}
        </h4>
        <div className={classes["list-product__amount"]}>
          <Button>+</Button>
          <h4>x{props.amount}</h4>
          <Button>-</Button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
