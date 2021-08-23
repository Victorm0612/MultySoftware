import Modal from "../UI/Modal";
import Button from "../UI/Button";
import ProductItem from "./ProductItem";
const Cart = (props) => {
  return (
    <Modal closeModal={props.closeCart}>
      <h1>Carro de compras</h1>
      <ul>
        <ProductItem title={"Pollo asado"} price={5000} amount={1} />
        <ProductItem title={"Pollo apanado"} price={5000} amount={1} />
      </ul>
      <Button action={props.closeCart}>Cerrar</Button>
    </Modal>
  );
};

export default Cart;
