import Card from "./Card";
import classes from "./Modal.module.css";
const Modal = () => {
  return (
    <div className={classes.modal}>
      <Card>
        <h1>Carro de compras</h1>
        <ul>
          <li>Pollo</li>
          <li>Pollo</li>
          <li>Pollo</li>
        </ul>
      </Card>
    </div>
  );
};

export default Modal;
