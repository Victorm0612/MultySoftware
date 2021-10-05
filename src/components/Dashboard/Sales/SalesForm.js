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
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { authActions } from "../../../store/auth";

const SalesForm = (props) => {
  const { token } = useSelector((state) => state.auth);
  let history = useHistory();
  const dispatch = useDispatch();
  const {
    products: productsCart,
    totalAmount: totalAmountStore,
    totalPrice: totalPriceStore,
  } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [messageBox, setMessageBox] = useState({
    message: "",
    isError: false,
  });
  const [totalAmount, setTotalAmount] = useState(totalAmountStore);
  const [totalPrice, setTotalPrice] = useState(totalPriceStore);
  const [showProductsCartForm, setShowProductsCartForm] = useState(false);
  const [productsToBuy, setProductsToBuy] = useState(productsCart);
  const [keyWord, setKeyWord] = useState("");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

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

  const createNewSale = (e) => {
    e.preventDefault();
    dispatch(authActions.setClientId(docId.toString()));
    history.push("/menu");
  };

  const setInputsForm = (sale, clients) => {
    setDocId(clients.find((user) => user.document_id === sale.docId).id);
    setsalesStatus(sale.sale_status);
    setProductsToBuy(sale.SaleItems);
    setTotalPrice(
      sale.SaleItems.reduce((prev, current) => ({
        item_total: prev.item_total + current.item_total,
      })).item_total
    );
    setTotalAmount(
      sale.SaleItems.reduce((prev, current) => ({
        amount: prev.amount + current.amount,
      })).amount
    );
    setTotalTax(
      sale.SaleItems.reduce((prev, current) => ({
        totalIva: prev.totalIva + current.totalIva,
      })).totalIva
    );
    setTotalDiscount(
      sale.SaleItems.reduce((prev, current) => ({
        total_discount: prev.total_discount + current.total_discount,
      })).total_discount
    );
  };

  const deleteSale = (e) => {
    e.preventDefault();
    props.onSetLoading(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const clients = await getFilteredUsers(1, token);
        const allProducts = await getAllProducts();
        setUsers(clients);
        setProducts(allProducts);
        if (props.actionToDo === "create") {
          setDocId(clients[0].id);
        } else {
          setInputsForm(props.oneSale, clients);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!isLoading) return;
    getData();
  }, [isLoading]); // eslint-disable-line react-hooks/exhaustive-deps
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
          ) : props.actionToDo === "delete" ? (
            <Fragment>
              <h1>{`${optionsAction[props.actionToDo]} Venta`}</h1>
              <h5 style={{ textAlign: "center" }}>
                ¿Está seguro que desea eliminar la venta #{props.oneSale.id}?
              </h5>
              <div className={classes.form_control__buttons}>
                <Button submitFor="button" action={props.closeForm} tag="close">
                  Cancelar
                </Button>
                {props.actionToDo !== "details" && (
                  <Button submitFor="button" action={deleteSale}>
                    Eliminar
                  </Button>
                )}
              </div>
            </Fragment>
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
                expression={(value, index) => value.id}
                accesKey="document_id"
              />
              {props.actionToDo !== "create" && (
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
              )}
              {props.actionToDo !== "create" && <label>Productos</label>}
              {props.actionToDo !== "create" && productsToBuy.length > 0 && (
                <ul>
                  {productsToBuy.map((pro) => (
                    <li key={pro.product_id}>
                      <b>
                        {
                          products.find(
                            (oneProduct) => oneProduct.id === pro.product_id
                          ).pro_name
                        }
                      </b>
                      : x{pro.amount} - ${pro.subtotal}
                    </li>
                  ))}
                  <li>
                    <b>IVA:</b> ${totalTax}
                  </li>
                  <li>
                    <b>Descuento:</b> ${totalDiscount}
                  </li>
                  <li>----------------------------------</li>
                  <li>
                    <p>
                      <b>Total a pagar: </b> x{totalAmount} - ${totalPrice}
                    </p>
                  </li>
                </ul>
              )}
              {props.actionToDo !== "create" && <hr />}
              <div className={classes.form_control__buttons}>
                <Button submitFor="button" action={props.closeForm} tag="close">
                  Cancelar
                </Button>
                {props.actionToDo !== "details" && (
                  <Button submitFor="button" action={createNewSale}>
                    Siguiente
                  </Button>
                )}
              </div>
            </Fragment>
          )}
        </form>
      )}
    </Fragment>
  );
};

export default SalesForm;
