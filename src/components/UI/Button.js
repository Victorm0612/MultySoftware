import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <button type={props.submitFor} className={classes.button}>
      {props.children}
    </button>
  );
};

export default Button;
