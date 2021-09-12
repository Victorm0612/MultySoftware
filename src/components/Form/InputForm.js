import { Fragment } from "react";
import classes from "./InputForm.module.css";

const InputForm = (props) => {
  //OnlyNumber keypress
  const isNumber = function (evt) {
    evt = evt ? evt : window.event;
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) {
      evt.preventDefault();
    } else {
      return true;
    }
  };

  const validInputClasses = (hasError) => {
    return hasError ? classes.error_input : classes.form_control__input;
  };

  let date = new Date();
  let minDate =
    props.typeInput === "date" && props.minDate
      ? `${date.getFullYear()}-${date.getMonth() < 10 && "0"}${
          date.getMonth() + 1
        }-${date.getDate() < 10 && "0"}${date.getDate()}`
      : null;
  return (
    <Fragment>
      <label
        className={`${classes.form_control__label} ${props.labelClass}`}
        htmlFor={props.id}
      >
        {props.labelMessage}
      </label>
      <input
        defaultValue={props.onlyValue}
        className={`${validInputClasses(props.inputHasError)} ${
          props.inputClass
        }`}
        onChange={props.change}
        onBlur={props.blur}
        value={props.value}
        required
        id={props.id}
        min={minDate}
        type={props.typeInput}
        onKeyPress={props.keyPress && isNumber}
        disabled={props.disabled}
      />
      {props.inputHasError && (
        <p className={classes.error_message}>
          {props.checkPassword
            ? "Las contraseñas deben coincidir."
            : props.errorMessage}
        </p>
      )}
    </Fragment>
  );
};

export default InputForm;
