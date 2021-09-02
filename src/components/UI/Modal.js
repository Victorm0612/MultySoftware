import Card from "./Card";
import classes from "./Modal.module.css";
import CSSTransition from "react-transition-group/CSSTransition";
import React, { Fragment } from "react";
import ReactDOM from "react-dom";
const animationTiming = {
  enter: 400,
  exit: 1000,
};

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
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
          >
            <Card>{props.children}</Card>
          </div>
        </CSSTransition>,
        document.getElementById("modal")
      )}
    </Fragment>
  );
};

export default Modal;
