import Card from "./Card";
import classes from "./Modal.module.css";
import CSSTransition from "react-transition-group/CSSTransition";

const animationTiming = {
  enter: 400,
  exit: 1000,
};

const Modal = (props) => {
  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      in={props.show}
      timeout={animationTiming}
      classNames={{
        enter: "",
        enterActive: "modal_open",
        exit: "",
        exitActive: "modal_closed",
      }}
    >
      <div
        className={`${classes.modal} ${
          props.show ? classes.modal_open : classes.modal_closed
        }`}
        onClick={props.closeModal}
      >
        <Card>{props.children}</Card>
      </div>
    </CSSTransition>
  );
};

export default Modal;
