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
    return hasError ? classes.error_input : null;
  };

  return (
    <Fragment>
      <label htmlFor={props.id}>{props.labelMessage}</label>
      <input
        className={validInputClasses(props.inputHasError)}
        onChange={props.change}
        onBlur={props.blur}
        value={props.value}
        required
        id={props.id}
        type={props.typeInput}
        onKeyPress={props.keyPress && isNumber}
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
