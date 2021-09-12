import { Fragment } from "react/cjs/react.production.min";
import classes from "./SelectForm.module.css";

const SelectForm = (props) => {
  return (
    <Fragment>
      <label className={classes.form_control_label} htmlFor={props.id}>
        {props.labelMessage}
      </label>
      <select
        className={classes.form_control_select}
        onChange={props.change}
        onBlur={props.blur}
        value={props.value}
        required
        id={props.id}
        disabled={props.disabled}
      >
        {props.list.map((item, index) => {
          return (
            <option key={index} value={props.expression(item, index)}>
              {item}
            </option>
          );
        })}
      </select>
      {props.hasError && (
        <p className={classes.error_message}>{props.errorMessage}</p>
      )}
    </Fragment>
  );
};

export default SelectForm;
