import InputForm from "../../Form/InputForm";
import MessageBox from "../../UI/MessageBox";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import SelectForm from "../../Form/SelectForm";
import classes from "../shared.module.css";
import { Fragment, useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import productClasses from "../ProductsPage.module.css";
import Ingredients from "../../Ingredients/Ingredients";
import { getFilteredUsers } from "../../../helper/httpHelpers/usersHttp";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../helper/httpHelpers/productHttp";
import SpinnerLoading from "../../UI/SpinnerLoading";
import { cartActions } from "../../../store/cart";
import SalesProducts from "./SalesProducts";

const SalesForm = (props) => {
  const { token } = useSelector((state) => state.auth);
  const {
    products: productsCart,
    totalAmount,
    totalPrice,
  } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [messageBox, setMessageBox] = useState({
    message: "",
    isError: false,
  });
  const [showProductsCartForm, setShowProductsCartForm] = useState(false);
  const [productsToBuy, setProductsToBuy] = useState(productsCart);
  const [keyWord, setKeyWord] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const {
    value: docId,
    isValid: docIdIsValid,
    hasError: docIdHasError,
    changeInputValueHandler: changeDocId,
    setInputValue: setDocId,
    inputBlurHandler: docIdBlurHandler,
    reset: resetDocId,
  } = useForm((docId) => typeof +docId === "number");

  const {
    value: salesStatus,
    isValid: salesStatusIsValid,
    hasError: salesStatusHasError,
    changeInputValueHandler: changeSalesStatus,
    setInputValue: setsalesStatus,
    inputBlurHandler: salesStatusBlurHandler,
    reset: resetSalesStatus,
  } = useForm((value) => +value === 0 || +value === 1);
  /*   {
    "sale_date": "11/04/2021",
    "sale_time": "13:04",
    "docId": 1107530686,
    "restaurant_id": 2,
    "sale_status": true,
    "products": [{"product_id": 2, "amount": 1}, {"product_id": 2, "amount": 1}]
    
} */

  const onSetKeyWord = (e) => {
    setKeyWord(e.target.value);
  };

  const openProductsCartForm = () => {
    setShowProductsCartForm(true);
  };

  const closeProductsCartForm = () => {
    setShowProductsCartForm(false);
  };

  const addProductToCart = () => {
    setProductsToBuy(productsCart);
    setShowProductsCartForm(false);
  };

  const optionsAction = {
    get: "Crear",
    create: "Crear",
    update: "Actualizar",
    delete: "Eliminar",
    details: "Detalles del",
  };

  let filterProducts = isLoading
    ? []
    : products.filter((product) =>
        product.pro_name
          .toLowerCase()
          .trim()
          .includes(keyWord.trim().toLowerCase())
      );

  useEffect(() => {
    const getData = async () => {
      try {
        const clients = await getFilteredUsers(1, token);
        const allProducts = await getAllProducts();
        setUsers(clients);
        setProducts(allProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) return;
    getData();
  }, [isLoading]);
  return (
    <Fragment>
      {showProductsCartForm ? (
        <Modal show={showProductsCartForm} size="big_card">
          <SalesProducts
            closeModal={closeProductsCartForm}
            addProductsToBuy={addProductToCart}
            products={products}
          />
        </Modal>
      ) : (
        <form className={classes.form_control}>
          {isLoading ? (
            <SpinnerLoading />
          ) : (
            <Fragment>
              <h1>{`${optionsAction[props.actionToDo]} Venta`}</h1>
              <SelectForm
                id="users_select"
                change={changeDocId}
                blur={docIdBlurHandler}
                value={docId}
                disabled={props.actionToDo === "details"}
                hasError={docIdHasError}
                labelMessage="Usuarios"
                errorMessage="Seleccione una opción válida."
                list={users}
                expression={(value, index) => value.document_id}
                accesKey="document_id"
              />
              <SelectForm
                id="status__input"
                change={changeSalesStatus}
                blur={salesStatusBlurHandler}
                value={salesStatus}
                disabled={props.actionToDo === "details"}
                hasError={salesStatusHasError}
                labelMessage="Estado"
                errorMessage="Seleccione una opción válida."
                list={["Activo", "Inactivo"]}
                expression={(value, index) => index}
              />
              <label>Productos</label>
              {productsToBuy.length > 0 && (
                <ul>
                  {productsToBuy.map((pro) => (
                    <li key={pro.product_id}>
                      {pro.pro_name} - x{pro.amount} - ${pro.price}
                    </li>
                  ))}
                  <li>----------------------------------</li>
                  <li>
                    <p>
                      x{totalAmount} - ${totalPrice}
                    </p>
                  </li>
                </ul>
              )}
              <hr />

              <Button action={openProductsCartForm}>Agregar Productos</Button>
              <div className={classes.form_control__buttons}>
                <Button submitFor="button" action={props.closeForm} tag="close">
                  Cancelar
                </Button>
                <Button>Guardar</Button>
              </div>
            </Fragment>
          )}
        </form>
      )}
    </Fragment>
  );
};

export default SalesForm;
