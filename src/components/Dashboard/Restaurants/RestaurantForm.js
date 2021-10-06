import { Fragment } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import useForm from "../../../hooks/useForm";
import InputForm from "../../Form/InputForm";
import SelectForm from "../../Form/SelectForm";
import classes from "../shared.module.css";
import Button from "../../UI/Button";
import MessageBox from "../../UI/MessageBox";

const RestaurantForm = (props) => {
  const {
    value: restaurantName,
    isValid: restaurantNameIsValid,
    hasError: restaurantNameHasError,
    changeInputValueHandler: changeRestaurantName,
    inputBlurHandler: restaurantNameBlurHandler,
  } = useForm(
    (name) => name.trim().length > 0,
    props.restaurant ? props.restaurant.restaurant_name : ""
  );

  const {
    value: address,
    isValid: addressIsValid,
    setInputValue: setAddress,
  } = useForm(
    (address) => address.label.trim().length !== 0,
    props.restaurant
      ? { label: props.restaurant.restaurant_address }
      : { label: "" }
  );

  const {
    value: phone,
    isValid: phoneIsValid,
    hasError: phoneHasError,
    changeInputValueHandler: changePhone,
    inputBlurHandler: phoneBlurHandler,
  } = useForm(
    (phone) => phone.length === 10 && /^[0-9\b]+$/.test(phone),
    props.restaurant ? props.restaurant.phone : ""
  );

  const {
    value: initTime,
    isValid: initTimeIsValid,
    hasError: initTimeHasError,
    changeInputValueHandler: changeInitTime,
    inputBlurHandler: initTimeBlurHandler,
  } = useForm(
    (name) => name.trim().length > 0,
    props.restaurant ? props.restaurant.ini_attention_time : ""
  );

  const {
    value: finalTime,
    isValid: finalTimeIsValid,
    hasError: finalTimeHasError,
    changeInputValueHandler: changeFinalTime,
    inputBlurHandler: finalTimeBlurHandler,
  } = useForm(
    (name) => name.trim().length > 0,
    props.restaurant ? props.restaurant.final_attention_time : ""
  );

  const {
    value: status,
    isValid: statusIsValid,
    hasError: statusHasError,
    changeInputValueHandler: changeStatus,
    inputBlurHandler: statusBlurHandler,
  } = useForm(
    (status) => +status >= 0 && +status <= 1,
    props.restaurant ? (props.restaurant.restaurant_status ? 0 : 1) : 0
  );

  const restaurantId = props.restaurant ? props.restaurant.id : null;
  const translateActions = {
    create: "Crear",
    get: "Crear",
    update: "Actualizar",
    delete: "Eliminar",
    details: "Detalles de",
  };

  let formIsValid =
    restaurantNameIsValid &&
    addressIsValid &&
    phoneIsValid &&
    initTimeIsValid &&
    finalTimeIsValid &&
    statusIsValid;

  const saveData = (e) => {
    e.preventDefault();
    const newObj = {
      id: restaurantId,
      restaurant_name: restaurantName,
      restaurant_address: address.label,
      phone: phone,
      ini_attention_time: initTime,
      final_attention_time: finalTime,
      restaurant_status: status ? false : true,
    };
    props.setRestaurant(newObj);
    console.log(newObj);
    props.loading(true);
  };

  return (
    <Fragment>
      {props.action === "delete" ? (
        <form onSubmit={saveData} className={classes.form_control}>
          <h3 style={{ fontWeight: "bold", textAlign: "center" }}>
            ¿Desea eliminar la sede {props.restaurant.restaurant_name}?
          </h3>
          <div className={classes.form_control__buttons}>
            <Button tag="close" submitFor="button" action={props.closeForm}>
              Cerrar
            </Button>
            <Button>{translateActions[props.action]}</Button>
          </div>
        </form>
      ) : (
        <form className={classes.form_control} onSubmit={saveData}>
          <h1>{translateActions[props.action]} restaurante</h1>
          <InputForm
            id="name__input"
            labelMessage="Nombre"
            change={changeRestaurantName}
            value={restaurantName}
            blur={restaurantNameBlurHandler}
            typeInput="text"
            inputHasError={restaurantNameHasError}
            errorMessage="Ingresa un nombre válido."
            disabled={props.action === "details"}
          />
          <label style={{ margin: "0 0.5rem", fontWeight: "bold" }}>
            Dirección
          </label>
          <GooglePlacesAutocomplete
            apiOptions={{ language: "es", region: "co" }}
            selectProps={{
              placeholder: `${
                props.action === "create"
                  ? "Ingrese su dirección..."
                  : address.label
              }`,
              isSearchable: props.action !== "details",
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
            disabled={props.action === "details"}
          />
          <InputForm
            id="init__input"
            labelMessage="Apertura"
            change={changeInitTime}
            blur={initTimeBlurHandler}
            value={initTime}
            typeInput="time"
            inputHasError={initTimeHasError}
            errorMessage="La hora es inválida."
            disabled={props.action === "details"}
          />
          <InputForm
            id="final__input"
            labelMessage="Cierre"
            change={changeFinalTime}
            blur={finalTimeBlurHandler}
            value={finalTime}
            typeInput="time"
            inputHasError={finalTimeHasError}
            errorMessage="La hora es inválida"
            disabled={props.action === "details"}
          />
          <SelectForm
            id="status__input"
            change={changeStatus}
            blur={statusBlurHandler}
            value={status}
            hasError={statusHasError}
            list={["Activo", "Inactivo"]}
            disabled={props.action === "details"}
            labelMessage="Estado"
            errorMessage="Seleccione una opción válida."
            expression={(value, index) => index}
          />
          <div className={classes.form_control__buttons}>
            <Button tag="close" submitFor="button" action={props.closeForm}>
              Cerrar
            </Button>
            <Button isInvalid={!formIsValid}>
              {translateActions[props.action]}
            </Button>
          </div>
          {props.messageBox.message.length !== 0 && (
            <MessageBox
              message={props.messageBox.message}
              isError={props.messageBox.isError}
            />
          )}
        </form>
      )}
    </Fragment>
  );
};

export default RestaurantForm;
