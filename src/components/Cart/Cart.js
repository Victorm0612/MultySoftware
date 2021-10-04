import Button from "../UI/Button";
import classes from "./ProductItem.module.css";
import ProductItem from "./ProductItem";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";
import { useHistory } from "react-router";

const Cart = (props) => {
  let history = useHistory();
  const dispatch = useDispatch();
  let productsStored = useSelector((state) => state.cart.products);
  const [products, setProducts] = useState(productsStored);

  const removeProductToCart = (id) => {
    dispatch(cartActions.removeProduct(id));
    setProducts((prevState) => {
      return prevState.filter((product) => product.product_id !== id);
    });
  };

  const createOrder = (e) => {
    e.preventDefault();
    dispatch(cartActions.setOrder(true));
    history.replace("/order");
    props.closeModal();
  };

  return (
    <Fragment>
      <div className={classes.close_button}>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.closeModal}
        ></button>
      </div>
      <h1>Carro de compras</h1>
      <ul className={classes.list_cart}>
        {products.map((product) => (
          <ProductItem
            key={product.product_id}
            id={product.product_id}
            title={product.pro_name}
            price={product.price}
            amount={product.amount}
            onRemove={removeProductToCart}
          />
        ))}
      </ul>
      <div className={classes.cart_buttons}>
        <Button isInvalid={products.length === 0} action={createOrder}>
          Comprar
        </Button>
      </div>
    </Fragment>
  );
};

export default Cart;
