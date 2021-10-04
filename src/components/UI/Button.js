import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      onClick={props.action}
      type={props.submitFor}
      disabled={props.isInvalid}
      className={props.tag === "close" ? classes.close_button : classes.button}
    >
      {props.children}
    </button>
  );
};

export default Button;
