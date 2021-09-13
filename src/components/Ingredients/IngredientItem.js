import { useEffect, useState } from "react";
import Button from "../UI/Button";
import classes from "./shared.module.css";
const IngredientItem = (props) => {
  const [amount, setAmount] = useState(0);

  const increaseAmount = () => {
    setAmount((prevState) => prevState + 1);
  };

  const decreaseAmount = () => {
    setAmount((prevState) => (prevState === 0 ? prevState : prevState - 1));
  };
  const addToList = props.onAdd;
  const ingName = props.ingName;
  useEffect(() => {
    if (amount > 0) {
      addToList({ ingredient_name: ingName, amount: amount });
    }
  }, [amount, ingName]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <li className={classes.item}>
      <div className={classes.item__name}>{ingName}</div>
      <div className={classes.item__amount}>
        <Button action={decreaseAmount} submitFor="button">
          -
        </Button>
        x{amount}
        <Button action={increaseAmount} submitFor="button">
          +
        </Button>
      </div>
    </li>
  );
};

export default IngredientItem;
