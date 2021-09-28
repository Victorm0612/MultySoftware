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
import { useSelector } from "react-redux";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import logoImg from "../../images/Logo.png";
import Modal from "../UI/Modal";
import PayCardForm from "./PayCardForm";

const OrderPage = () => {
  //Primero sale después bill después payment después el tipo de pago
  const { id, token } = useSelector((state) => state.auth);
  const { products, mainDiscount, totalPrice, totalAmount } = useSelector(
    (state) => state.cart
  );
  const PAY_METHODS = ["Efectivo", "Crédito", "Débito"];
  const [isLoading, setIsLoading] = useState(true);
  const [showFormPayMethod, setShowFormPayMethod] = useState(false);
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    isError: false,
  });

  const changeEditHandler = () => {
    setEdit((prevState) => !prevState);
  };

  const openFormPayMethod = () => {
    setShowFormPayMethod(true);
  };

  const closeFormPayMethod = () => {
    setShowFormPayMethod(false);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Send...");
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
    hasError: addressHasError,
    changeInputValueHandler: changeAddress,
    setInputValue: setAddress,
    inputBlurHandler: addressBlurHandler,
  } = useForm((address) => address.label.trim().length !== 0, { label: "" });

  //enteredMethod
  const {
    value: method,
    isValid: methodIsValid,
    hasError: methodHasError,
    changeInputValueHandler: changeMethod,
    setInputValue: setMethod,
    inputBlurHandler: methodBlurHandler,
  } = useForm((method) => +method >= 0 && +method <= 2, 0);

  //enteredMethod
  const {
    value: secondMethod,
    isValid: secondMethodIsValid,
    hasError: secondMethodHasError,
    changeInputValueHandler: changeSecondMethod,
    setInputValue: setSecondMethod,
    inputBlurHandler: secondMethodBlurHandler,
  } = useForm((secondMethod) => +secondMethod >= 0 && +secondMethod <= 2, 0);

  //enteredMethod
  const {
    value: wayToPay,
    isValid: wayToPayIsValid,
    hasError: wayToPayHasError,
    changeInputValueHandler: changeWayToPay,
    setInputValue: setWayToPay,
    inputBlurHandler: wayToPayBlurHandler,
  } = useForm((wayToPay) => +wayToPay >= 0 && +wayToPay <= 1, 1);

  let formIsValid =
    firstNameIsValid &&
    lastNameIsValid &&
    emailIsValid &&
    phoneIsValid &&
    wayToPayIsValid &&
    documentIdIsValid &&
    addressIsValid &&
    methodIsValid &&
    (+wayToPay === 0 ? secondMethodIsValid : true);

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

  useEffect(() => {
    const getUser = async () => {
      let boxMessage = "";
      let boxError = false;
      try {
        const { data: response } = await axios.get(`users/${id}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(response.data);
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

    if (!isLoading) return;
    getUser();
  }, [isLoading, token, id, setInputsForm]);

  return (
    <div className={orderClasses.body_page}>
      <div className={orderClasses.order_page}>
        {isLoading ? (
          <SpinnerLoading />
        ) : (
          <Fragment>
            {showFormPayMethod && (
              <Modal show={showFormPayMethod} size="big_card">
                <h1>{PAY_METHODS[method]}</h1>
                <PayCardForm
                  documentUser={documentId}
                  isCredit={PAY_METHODS[method] === "Crédito"}
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
              <form onSubmit={submitHandler} className={classes.form_control}>
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
                  <SelectForm
                    id="method__input"
                    change={(e) => {
                      changeMethod(e);
                      if (PAY_METHODS[e.target.value] !== "Efectivo")
                        openFormPayMethod();
                    }}
                    blur={methodBlurHandler}
                    value={method}
                    hasError={methodHasError}
                    list={PAY_METHODS}
                    labelMessage="Seleccionar método de pago"
                    errorMessage="Seleccione una opción válida."
                    expression={(value, index) => index}
                  />
                  {+wayToPay === 0 && (
                    <SelectForm
                      id="method__input"
                      change={(e) => {
                        changeSecondMethod(e);
                        if (PAY_METHODS[e.target.value] !== "Efectivo")
                          openFormPayMethod();
                      }}
                      blur={secondMethodBlurHandler}
                      value={secondMethod}
                      hasError={secondMethodHasError}
                      list={PAY_METHODS}
                      labelMessage="Seleccionar segundo método de pago"
                      errorMessage="Seleccione una opción válida."
                      expression={(value, index) => index}
                    />
                  )}
                  <SelectForm
                    id="way_to_pay__input"
                    change={changeWayToPay}
                    blur={wayToPayBlurHandler}
                    value={wayToPay}
                    hasError={wayToPayHasError}
                    list={["Sí", "No"]}
                    labelMessage="Dividir pago en dos"
                    errorMessage="Seleccione una opción válida."
                    expression={(value, index) => index}
                  />
                </div>
                <label className={orderClasses.label_select}>Detalles</label>
                <textarea
                  className={orderClasses.textarea_order}
                  id="description"
                  name="description"
                  rows="4"
                  cols="50"
                  placeholder="Información del destino..."
                ></textarea>
                <div className={classes.form_control__buttons}>
                  <Button action={changeEditHandler}>
                    {edit ? "Guardar" : "Editar"}
                  </Button>
                  <Button isInvalid={!formIsValid} submitFor="submit">
                    Aplicar cambios
                  </Button>

                  <Button action={changeEditHandler}>Cancelar</Button>
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
            <li key={product.id}>
              <div className={orderClasses.product_item}>
                <h5>{product.pro_name}</h5>
                <div className={orderClasses.product_item__amount}>
                  <p>
                    $
                    {new Intl.NumberFormat("es-CO", {
                      maximumSignificantDigits: 3,
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
                maximumSignificantDigits: 3,
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
            <p>9%</p>
          </div>
        </div>
        <hr />
        <div className={`${orderClasses.product_item}`}>
          <h5>Total a pagar</h5>
          <div className={orderClasses.product_item__amount}>
            <p>
              $
              {new Intl.NumberFormat("es-CO", {
                maximumSignificantDigits: 3,
              }).format(
                totalPrice -
                  totalPrice * mainDiscount +
                  (totalPrice - totalPrice * mainDiscount) * 0.09
              )}
            </p>
            <p>x{totalAmount}</p>
          </div>
          <div className={orderClasses.product__button}>
            <Button isInvalid={!formIsValid}>Pagar</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
