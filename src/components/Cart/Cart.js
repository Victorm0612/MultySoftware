import Button from "../UI/Button";
import classes from "./ProductItem.module.css";
import ProductItem from "./ProductItem";
import { Fragment, useReducer } from "react";
import cart from "../../store/cart";
import { useSelector } from "react-redux";

const Cart = (props) => {
  return (
    <Fragment>
      <h1>Carro de compras</h1>
      <ul className={classes.list_cart}>
        <ProductItem title={"Pollo asado"} price={5000} amount={1} />
        <ProductItem title={"Pollo apanado"} price={5000} amount={1} />
      </ul>
      <Button action={props.closeModal}>Cerrar</Button>
    </Fragment>
  );
};

export default Cart;
