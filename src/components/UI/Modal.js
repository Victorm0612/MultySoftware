import Card from "./Card";
import classes from "./Modal.module.css";
const Modal = (props) => {
  return (
    <div className={classes.modal} onClick={props.closeModal}>
      <Card>{props.children}</Card>
    </div>
  );
};

export default Modal;
