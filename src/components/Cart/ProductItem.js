import classes from "./ProductItem.module.css";
import Button from "../UI/Button";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
import { useState } from "react";
const ProductItem = (props) => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(props.amount);

  const increaseAmount = (e) => {
    e.preventDefault();
    dispatch(cartActions.increaseAmount(props.id));
    setAmount((prevState) => {
      return prevState + 1;
    });
  };

  const decreaseAmount = (e) => {
    e.preventDefault();
    if (amount === 1) {
      props.onRemove(props.id);
      return;
    }
    setAmount((prevState) => {
      return prevState - 1;
    });
    dispatch(cartActions.decreaseAmount(props.id));
  };
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
          <Button action={decreaseAmount}>-</Button>
          <h4>x{amount}</h4>
          <Button action={increaseAmount}>+</Button>
        </div>
      </div>
    </li>
  );
};

export default ProductItem;
