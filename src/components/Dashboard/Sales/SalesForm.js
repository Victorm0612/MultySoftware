import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import SelectForm from "../../Form/SelectForm";
import classes from "../shared.module.css";
import { Fragment, useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import { getFilteredUsers } from "../../../helper/httpHelpers/usersHttp";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../../helper/httpHelpers/productHttp";
import SpinnerLoading from "../../UI/SpinnerLoading";
import SalesProducts from "./SalesProducts";
import { useHistory } from "react-router";
import { authActions } from "../../../store/auth";

const SalesForm = (props) => {
  const { token, typeUser } = useSelector((state) => state.auth);
  let history = useHistory();
  const dispatch = useDispatch();
  const {
    products: productsCart,
    totalAmount: totalAmountStore,
    totalPrice: totalPriceStore,
  } = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(totalAmountStore);
  const [totalPrice, setTotalPrice] = useState(totalPriceStore);
  const [showProductsCartForm, setShowProductsCartForm] = useState(false);
  const [productsToBuy, setProductsToBuy] = useState(productsCart);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalTax, setTotalTax] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);

  const {
    value: docId,
    hasError: docIdHasError,
    changeInputValueHandler: changeDocId,
    setInputValue: setDocId,
    inputBlurHandler: docIdBlurHandler,
  } = useForm((docId) => typeof +docId === "number");

  const {
    value: salesStatus,
    hasError: salesStatusHasError,
    changeInputValueHandler: changeSalesStatus,
    setInputValue: setsalesStatus,
    inputBlurHandler: salesStatusBlurHandler,
  } = useForm((value) => +value === 0 || +value === 1);

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

  const createNewSale = (e) => {
    e.preventDefault();
    dispatch(authActions.setClientId(docId.toString()));
    history.push("/menu");
  };

  const setInputsForm = (sale, clients) => {
    setDocId(clients.find((user) => user.document_id === sale.docId).id);
    setsalesStatus(sale.sale_status);
    setProductsToBuy(sale.Products);
    setTotalPrice(sale.Bill.total_payment);
    setTotalAmount(
      sale.Products.reduce((prev, current) => ({
        amount: prev.SaleItem.amount + current.SaleItem.amount,
      })).amount
    );
    setTotalTax(sale.Bill.totalIva);
    setTotalDiscount(sale.Bill.total_discount);
  };

  const deleteSale = (e) => {
    e.preventDefault();
    props.onSetLoading(true);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        if (typeUser === 3) {
          const clients = await getFilteredUsers(1, token);
          setUsers(clients);
          if (props.actionToDo === "create") {
            setDocId(clients[0].id);
          } else {
            setInputsForm(props.oneSale, clients);
          }
        }
        const allProducts = await getAllProducts();
        setProducts(allProducts);
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
              {typeUser !== 1 && (
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
              )}
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
              {props.actionToDo !== "create" &&
                productsToBuy &&
                productsToBuy.length > 0 && (
                  <ul>
                    {productsToBuy.map((pro) => (
                      <li key={pro.product_id}>
                        <b>{pro.pro_name}</b>: x{pro.SaleItem.amount} - $
                        {pro.price}/u
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
