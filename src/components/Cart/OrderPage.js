import InputForm from "../Form/InputForm";
import Card from "../UI/Card";
import classes from "../ProfilePage.module.css";
import orderClasses from "./OrderPage.module.css";
import MessageBox from "../UI/MessageBox";
import Button from "../UI/Button";
import SpinnerLoading from "../UI/SpinnerLoading";
import useForm from "../../hooks/useForm";
import { Fragment, useCallback, useEffect, useState } from "react";
import SelectForm from "../Form/SelectForm";
import { axiosInstance as axios } from "../../config/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import logoImg from "../../images/Logo.png";
import Modal from "../UI/Modal";
import PayCardForm from "./PayCardForm";
import { createSale, Sale } from "../../helper/httpHelpers/saleHttp";
import { createPayment, Payment } from "../../helper/httpHelpers/paymentHttp";
import { CardToPay, createCard } from "../../helper/httpHelpers/cardHttp";
import { CashPay, createCashPay } from "../../helper/httpHelpers/cashPayHttp";
import {
  createCreditPay,
  CreditPay,
} from "../../helper/httpHelpers/creditPayHttp";
import {
  createDebitPay,
  DebitPay,
} from "../../helper/httpHelpers/debitPayHttp";
import { cartActions } from "../../store/cart";

const OrderPage = () => {
  const { id, token, clientDocId, typeUser } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const { products, mainDiscount, totalPrice, totalAmount } = useSelector(
    (state) => state.cart
  );
  const TAX = 0.19;
  const PAY_METHODS = ["Efectivo", "Crédito", "Débito"];
  const [action, setAction] = useState("get");
  const [isLoading, setIsLoading] = useState(true);
  const [payDescription, setPayDescription] = useState("");
  const [methodsToPay, setMethodsToPay] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [showOptionsToPay, setShowOptionsToPay] = useState(false);
  const [showFormPayMethod, setShowFormPayMethod] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    isError: false,
  });

  const changeEditHandler = () => {
    setEdit((prevState) => !prevState);
  };

  const openFormPayMethod = (e) => {
    e.preventDefault();
    setShowFormPayMethod(true);
  };

  const closeFormPayMethod = () => {
    setShowFormPayMethod(false);
  };

  const openOptions = () => {
    setShowOptions(true);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  const openOptionsToPay = (e) => {
    e.preventDefault();
    closeOptions();
    setShowOptionsToPay(true);
  };

  const closeOptionsToPay = () => {
    setShowOptionsToPay(false);
  };

  const changeDescription = (e) => {
    setPayDescription(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      (+wayToPay === 0 && methodsToPay.length === 2) ||
      (+wayToPay === 1 && methodsToPay.length === 1)
    ) {
      setAction("send");
      setIsLoading(true);
      return;
    }
    return openOptions();
  };

  // enteredFirstName input
  const {
    value: firstName,
    isValid: firstNameIsValid,
    hasError: firstNameHasError,
    changeInputValueHandler: changeFirstName,
    setInputValue: setFirstName,
    inputBlurHandler: firstNameBlurHandler,
  } = useForm((inputName) => inputName.trim().length !== 0);

  // enteredLastName input
  const {
    value: lastName,
    isValid: lastNameIsValid,
    hasError: lastNameHasError,
    changeInputValueHandler: changeLastName,
    setInputValue: setLastName,
    inputBlurHandler: lastNameBlurHandler,
  } = useForm((lastName) => lastName.trim().length !== 0);

  // enteredDocumentId input
  const {
    value: documentId,
    isValid: documentIdIsValid,
    hasError: documentIdHasError,
    changeInputValueHandler: changeDocumentId,
    setInputValue: setDocumentId,
    inputBlurHandler: documentIdBlurHandler,
  } = useForm(
    (documentId) =>
      documentId.toString().length >= 8 && /^[0-9\b]+$/.test(documentId)
  );

  //enteredEmail input
  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    changeInputValueHandler: changeEmail,
    setInputValue: setEmail,
    inputBlurHandler: emailBlurHandler,
  } = useForm((email) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      String(email).toLowerCase()
    )
  );

  //enteredPhone
  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    changeInputValueHandler: changePhone,
    setInputValue: setPhone,
    inputBlurHandler: phoneBlurHandler,
  } = useForm((phone) => phone.length === 10 && /^[0-9\b]+$/.test(phone));

  //enteredAddress
  const {
    value: address,
    isValid: addressIsValid,
    setInputValue: setAddress,
  } = useForm((address) => address.label.trim().length !== 0, { label: "" });

  //enteredMethod
  const {
    value: method,
    isValid: methodIsValid,
    hasError: methodHasError,
    changeInputValueHandler: changeMethod,
    inputBlurHandler: methodBlurHandler,
  } = useForm((method) => +method >= 0 && +method <= 2, 0);

  //enteredMethod
  const {
    value: wayToPay,
    isValid: wayToPayIsValid,
    hasError: wayToPayHasError,
    changeInputValueHandler: changeWayToPay,
    inputBlurHandler: wayToPayBlurHandler,
  } = useForm((wayToPay) => +wayToPay >= 0 && +wayToPay <= 1, 1);

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    phoneIsValid &&
    methodIsValid &&
    wayToPayIsValid &&
    documentIdIsValid &&
    addressIsValid;

  const setInputsForm = useCallback(
    (user) => {
      setFirstName(user.first_name);
      setLastName(user.last_name);
      setDocumentId(user.document_id);
      setEmail(user.email);
      setPhone(user.phone);
    },
    [setFirstName, setLastName, setDocumentId, setEmail, setPhone]
  );

  const onChangeMethodsToPay = (data) => {
    setMethodsToPay((prevState) => {
      const index = prevState.findIndex(
        (card) => card.card_number === data.card_number
      );
      if (index === -1) return [...prevState, data];
      return [
        ...prevState.filter((card) => card.card_number === data.card_number),
        data,
      ];
    });
  };

  let priceWithDiscountAndTax = Math.trunc(
    totalPrice -
      totalPrice * mainDiscount +
      (totalPrice - totalPrice * mainDiscount) * TAX
  );

  useEffect(() => {
    const getUser = async () => {
      let boxMessage = "";
      let boxError = false;
      let userId;
      clientDocId.length > 0 && typeUser > 1
        ? (userId = clientDocId)
        : (userId = id);
      try {
        const { data: response } = await axios.get(`users/${userId}`, {
          headers: {
            Authorization: token,
          },
        });
        setInputsForm(response.data);
      } catch (error) {
        boxMessage = error.response.data.message;
        boxError = true;
      } finally {
        setMessage({
          message: boxMessage,
          isError: boxError,
        });
        setIsLoading(false);
      }
    };

    const sendData = async () => {
      //Primero sale después bill después payment después el tipo de pag
      try {
        const dataSale = await createSale(
          new Sale(documentId, products, address),
          token
        );
        const dataPayment = await createPayment(
          new Payment(
            payDescription,
            dataSale.newBill.total_payment,
            dataSale.newBill.id
          ),
          token
        );
        for (let method of methodsToPay) {
          if (method.type !== 0) {
            await createCard(
              new CardToPay(
                method.card_number,
                method.owner_id,
                method.exp_date,
                method.type,
                method.bank
              ),
              token
            );
          }
        }
        for (let method of methodsToPay) {
          if (method.type === 0) {
            await createCashPay(
              new CashPay(
                dataPayment.id,
                method.total_amount,
                method.one_pay,
                documentId
              ),
              token
            );
          }
          if (method.type === 1) {
            await createCreditPay(
              new CreditPay(
                method.fees_number,
                method.card_number,
                dataPayment.id,
                method.total_amount,
                method.one_pay
              ),
              token
            );
          }
          if (method.type === 2) {
            await createDebitPay(
              new DebitPay(
                "Ahorros",
                method.card_number,
                method.total_amount,
                method.one_pay,
                dataPayment.id
              ),
              token
            );
          }
        }
        setIsLoading(false);
        setAction("get");
        dispatch(cartActions.orderCompleted());
      } catch (error) {
        setIsLoading(false);
        setAction("get");
        console.error(error);
      }
    };

    const actionsObj = {
      get: getUser,
      send: sendData,
    };

    if (!isLoading) return;
    actionsObj[action]();
  }, [isLoading, token, id, setInputsForm, action]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={orderClasses.body_page}>
      <div className={orderClasses.order_page}>
        {isLoading ? (
          <SpinnerLoading />
        ) : (
          <Fragment>
            {showOptions && (
              <Modal show={showOptions} size="small_card">
                <form
                  onSubmit={openOptionsToPay}
                  className={classes.form_control}
                >
                  <h1>¿Desea dividir el pago?</h1>
                  <SelectForm
                    id="way_to_pay__input"
                    change={changeWayToPay}
                    blur={wayToPayBlurHandler}
                    value={wayToPay}
                    hasError={wayToPayHasError}
                    list={["Sí", "No"]}
                    labelMessage=""
                    errorMessage="Seleccione una opción válida."
                    expression={(value, index) => index}
                  />
                  <div className={classes.form_control__buttons}>
                    <Button
                      tag="close"
                      submitFor="button"
                      action={closeOptions}
                    >
                      Cancelar
                    </Button>
                    <Button>Siguiente</Button>
                  </div>
                </form>
              </Modal>
            )}
            {showOptionsToPay &&
              (+wayToPay
                ? methodsToPay.length < 1
                : methodsToPay.length < 2) && (
                <Modal show={showOptionsToPay} size="small_card">
                  <form
                    onSubmit={openFormPayMethod}
                    className={classes.form_control}
                  >
                    <h2 style={{ fontWeight: "bold", textAlign: "center" }}>
                      {`Seleccionar método de pago ${methodsToPay.length + 1}`}
                    </h2>
                    <SelectForm
                      id="method__input"
                      change={changeMethod}
                      blur={methodBlurHandler}
                      value={method}
                      hasError={methodHasError}
                      list={PAY_METHODS}
                      labelMessage=""
                      errorMessage="Seleccione una opción válida."
                      expression={(value, index) => index}
                    />
                    <div className={classes.form_control__buttons}>
                      <Button
                        tag="close"
                        submitFor="button"
                        action={closeOptionsToPay}
                      >
                        Cancelar
                      </Button>
                      <Button>Siguiente</Button>
                    </div>
                  </form>
                </Modal>
              )}
            {showFormPayMethod && (
              <Modal show={showFormPayMethod} size="big_card">
                <h1>{PAY_METHODS[method]}</h1>
                <PayCardForm
                  currentMethods={methodsToPay}
                  totalAmount={priceWithDiscountAndTax}
                  onePay={+wayToPay === 1}
                  onSaveInfo={onChangeMethodsToPay}
                  documentUser={documentId}
                  type={PAY_METHODS[method]}
                  closeForm={closeFormPayMethod}
                />
              </Modal>
            )}
            <Card size="small_card">
              <div className={classes.profile_header}>
                <img
                  className={orderClasses.img_header}
                  src={logoImg}
                  width="200px"
                  height="auto"
                  alt="Logo chicks restaurants"
                />
                <h1>Finaliza tu pedido</h1>
              </div>
              <form className={classes.form_control}>
                <div className={classes.form_control__body}>
                  <InputForm
                    id="name__input"
                    labelMessage="Nombre"
                    change={changeFirstName}
                    value={firstName}
                    blur={firstNameBlurHandler}
                    typeInput="text"
                    inputHasError={firstNameHasError}
                    errorMessage="Ingresa un nombre válido."
                    disabled={!edit}
                  />
                  <InputForm
                    id="last_name__input"
                    labelMessage="Apellido"
                    change={changeLastName}
                    blur={lastNameBlurHandler}
                    value={lastName}
                    typeInput="text"
                    inputHasError={lastNameHasError}
                    errorMessage="Ingresa un apellido válido"
                    disabled={!edit}
                  />
                  <InputForm
                    id="document-number__input"
                    labelMessage="Número de documento"
                    change={changeDocumentId}
                    blur={documentIdBlurHandler}
                    value={documentId}
                    typeInput="text"
                    inputHasError={documentIdHasError}
                    errorMessage="El documento es inválido o contiene menos de 8 carácteres."
                    keyPress={true}
                    disabled={!edit}
                  />
                  <InputForm
                    id="email__input"
                    labelMessage="Correo electrónico"
                    change={changeEmail}
                    blur={emailBlurHandler}
                    value={email}
                    typeInput="email"
                    inputHasError={emailHasError}
                    errorMessage="El email debe ser válido."
                    disabled={!edit}
                  />
                  <InputForm
                    id="phone__input"
                    labelMessage="Teléfono"
                    change={changePhone}
                    blur={phoneBlurHandler}
                    value={phone}
                    typeInput="text"
                    inputHasError={phoneHasError}
                    errorMessage="El teléfono es inválido o contiene menos de 10 carácteres."
                    keyPress={true}
                    disabled={!edit}
                  />
                  <label className={orderClasses.label_select}>
                    Dirección de envío
                  </label>
                  <GooglePlacesAutocomplete
                    apiOptions={{ language: "es", region: "co" }}
                    selectProps={{
                      placeholder: "Ingrese su dirección...",
                      isSearchable: edit,
                      address,
                      onChange: setAddress,
                      styles: {
                        control: (provided, state) => ({
                          ...provided,
                          border: state.isFocused
                            ? "2px solid rgb(230, 155, 17)"
                            : "none",
                          "&:hover": {
                            borderColor: "none",
                          },
                        }),
                        container: (provided, state) => ({
                          ...provided,
                          border: "2px solid rgb(230, 155, 17)",
                          borderRadius: "10px",
                          margin: "0.5rem 0.5rem",
                          outline: "none",
                        }),
                        input: (provided) => ({
                          ...provided,
                          fontFamily: "inherit",
                        }),
                      },
                    }}
                    apiKey="AIzaSyCNSSxmXqpn8T7lKeMnwYMPu_FTcZLBWFM"
                  />
                </div>
                <label className={orderClasses.label_select}>Detalles</label>
                <textarea
                  value={payDescription}
                  onChange={changeDescription}
                  className={orderClasses.textarea_order}
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  placeholder="Información adicional..."
                  disabled={!edit}
                ></textarea>
                <div className={classes.form_control__buttons}>
                  <Button submitFor="button" action={changeEditHandler}>
                    {edit ? "Guardar" : "Editar"}
                  </Button>
                  <Button
                    tag="close"
                    submitFor="button"
                    action={changeEditHandler}
                  >
                    Cancelar
                  </Button>
                </div>
              </form>
              {message.message.length > 0 && (
                <MessageBox
                  isError={message.isError}
                  message={message.message}
                />
              )}
            </Card>
          </Fragment>
        )}
      </div>
      <div className={orderClasses.checkout}>
        <h3>Resumen de la orden</h3>
        <hr />
        <ul className={orderClasses.list_products}>
          {products.map((product) => (
            <li key={product.product_id}>
              <div className={orderClasses.product_item}>
                <h5>{product.pro_name}</h5>
                <div className={orderClasses.product_item__amount}>
                  <p>
                    $
                    {new Intl.NumberFormat("es-CO", {
                      maximumSignificantDigits: 6,
                    }).format(product.price)}
                  </p>
                  <p>x{product.amount}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <hr />
        <div className={`${orderClasses.product_item}`}>
          <h5>Subtotal</h5>
          <div className={orderClasses.product_item__amount}>
            <p>
              $
              {new Intl.NumberFormat("es-CO", {
                maximumSignificantDigits: 6,
              }).format(totalPrice)}
            </p>
            <p>x{totalAmount}</p>
          </div>
        </div>
        <div className={`${orderClasses.product_item}`}>
          <h5>Promociones</h5>
          <div className={orderClasses.product_promo}>
            {products.map((product) =>
              product.discounts.map((discount) => (
                <span
                  key={discount.id}
                  className={`badge rounded-pill bg-primary ${orderClasses.badge}`}
                >
                  {discount.discount_name}
                </span>
              ))
            )}
          </div>
        </div>
        <div
          className={`${orderClasses.product_item}`}
          style={{ marginTop: "1rem" }}
        >
          <h5>Iva</h5>
          <div className={orderClasses.product_item__amount}>
            <p>{TAX * 100}%</p>
          </div>
        </div>
        <hr />
        {methodsToPay.length > 0 && (
          <Fragment>
            <div className={`${orderClasses.product_item}`}>
              <h5>Métodos de Pago</h5>
              <ul className={orderClasses.list_products}>
                {methodsToPay.map((method, index) => (
                  <li key={index}>
                    <div className={orderClasses.product_item}>
                      <div className={orderClasses.product_item__amount}>
                        {method.type === 0 && <p>Efectivo</p>}
                        {method.type !== 0 && (
                          <p>{`${
                            PAY_METHODS[method.type]
                          } / ${method.card_number.substring(13, 16)}`}</p>
                        )}
                        <div className={orderClasses.method_pay}>
                          <p>{`$
              ${new Intl.NumberFormat("es-CO", {
                maximumSignificantDigits: 6,
              }).format(method.total_amount)}`}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <hr />
          </Fragment>
        )}
        <div className={`${orderClasses.product_item}`}>
          <h5>Total a pagar</h5>
          <div className={orderClasses.product_item__amount}>
            <p>
              $
              {new Intl.NumberFormat("es-CO", {
                maximumSignificantDigits: 6,
              }).format(priceWithDiscountAndTax)}
            </p>
            <p>x{totalAmount}</p>
          </div>
          <div className={orderClasses.product__button}>
            <Button action={submitHandler} isInvalid={!formIsValid}>
              Pagar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
