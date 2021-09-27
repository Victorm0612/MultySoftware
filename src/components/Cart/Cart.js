import Button from "../UI/Button";
import classes from "./ProductItem.module.css";
import ProductItem from "./ProductItem";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart";

const Cart = (props) => {
  const dispatch = useDispatch();
  const productsStored = useSelector((state) => state.cart.products);
  const [products, setProducts] = useState(productsStored);

  const removeProductToCart = (id) => {
    dispatch(cartActions.removeProduct(id));
    setProducts((prevState) => {
      return prevState.filter((product) => product.id !== id);
    });
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
            key={product.id}
            id={product.id}
            title={product.pro_name}
            price={product.price}
            amount={product.amount}
            onRemove={removeProductToCart}
          />
        ))}
      </ul>
      <div className={classes.cart_buttons}>
        <Button action={props.closeModal}>Comprar</Button>
      </div>
    </Fragment>
  );
};

export default Cart;
