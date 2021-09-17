import { useEffect, useState } from "react";
import React from "react";
import Button from "../UI/Button";
import classes from "./shared.module.css";
const IngredientItem = (props) => {
  const [amount, setAmount] = useState(props.amount);
  const [isDiferent, setIsDiferent] = useState(false);

  const increaseAmount = () => {
    setAmount((prevState) => prevState + 1);
    setIsDiferent(true);
  };

  const decreaseAmount = () => {
    setAmount((prevState) => (prevState === 0 ? prevState : prevState - 1));
    setIsDiferent(true);
  };
  const addToList = props.onAdd;
  const ingName = props.ingName;
  useEffect(() => {
    if (isDiferent) {
      addToList({
        ingredient_name: ingName,
        amount: amount,
      });
    }
    return () => {
      setIsDiferent(false);
    };
  }, [amount, ingName]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <li className={classes.item}>
      <div className={classes.item__name}>{ingName}</div>
      <div className={classes.item__amount}>
        <Button
          data-test="button-increment"
          action={decreaseAmount}
          submitFor="button"
        >
          -
        </Button>
        x{amount}
        <Button
          data-test="button-decrease"
          action={increaseAmount}
          submitFor="button"
        >
          +
        </Button>
      </div>
    </li>
  );
};

export default IngredientItem;
