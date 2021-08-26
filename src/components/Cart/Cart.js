import Button from "../UI/Button";
import ProductItem from "./ProductItem";
import { Fragment } from "react";
const Cart = (props) => {
  return (
    <Fragment>
      <h1>Carro de compras</h1>
      <ul>
        <ProductItem title={"Pollo asado"} price={5000} amount={1} />
        <ProductItem title={"Pollo apanado"} price={5000} amount={1} />
      </ul>
      <Button action={props.closeModal}>Cerrar</Button>
    </Fragment>
  );
};

export default Cart;
