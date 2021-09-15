import { useEffect, useState } from "react";
import React from "react";
import Button from "../UI/Button";
import classes from "./shared.module.css";
const IngredientItem = (props) => {
  const [amount, setAmount] = React.useState(0);
  const [isSum, setIsSum] = React.useState(false);

  const increaseAmount = () => {
    setAmount((prevState) => prevState + 1);
    setIsSum(true);
  };

  const decreaseAmount = () => {
    setAmount((prevState) => (prevState === 0 ? prevState : prevState - 1));
    setIsSum(false);
  };
  const addToList = props.onAdd;
  const ingName = props.ingName;
  useEffect(() => {
    if (amount > 0) {
      addToList({
        ingredient_name: ingName,
        amount: isSum ? amount : amount * -1,
      });
    }
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
