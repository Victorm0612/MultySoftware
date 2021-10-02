import Button from "../../UI/Button";
import classes from "../../Cart/ProductItem.module.css";
import ProductItem from "../../Cart/ProductItem";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../../store/cart";

const SalesProducts = (props) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState(
    props.products.map((product) => {
      product.amount = 0;
      return product;
    })
  );

  const addProducts = () => {
    props.addProductsToBuy();
  };

  const removeProductToCart = (id) => {
    dispatch(cartActions.removeProduct(id));
    setProducts((prevState) => {
      return prevState.map((product) => {
        if (product.id === id) {
          product.amount = 0;
        }
        return product;
      });
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
      <h1>Productos</h1>
      <ul className={classes.list_cart}>
        {products.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.pro_name}
            price={product.price}
            amount={product.amount}
            discounts={product.Discounts}
            tax={product.percentage_tax}
            onRemove={removeProductToCart}
          />
        ))}
      </ul>
      <div className={classes.cart_buttons}>
        <Button isInvalid={products.length === 0} action={addProducts}>
          Comprar
        </Button>
      </div>
    </Fragment>
  );
};

export default SalesProducts;
