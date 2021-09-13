import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "../UI/Button";
import IngredientItem from "./IngredientItem";
import classes from "./shared.module.css";
const Ingredients = (props) => {
  const [ingredientsList, setIngredientsList] = useState([]);

  const addToList = (newIngredient) => {
    let oldArr = props.ingredientsToAdd;
    let newArr;
    const itemId = props.list.find(
      (ing) => ing.ingredient_name === newIngredient.ingredient_name
    ).id;
    let tmp = {
      ingredient_name: newIngredient.ingredient_name,
      ingredient_id: itemId,
      amount: newIngredient.amount,
    };
    if (oldArr.length === 0) {
      return setIngredientsList([...oldArr, tmp]);
    }
    const found = oldArr.find(
      (element) => element.ingredient_id === tmp.ingredient_id
    );
    if (!!found) {
      newArr = oldArr.map((element) => {
        if (element.ingredient_id === tmp.ingredient_id) {
          element.amount = tmp.amount;
        }
        return element;
      });
      return setIngredientsList(newArr);
    }
    return setIngredientsList([...oldArr, tmp]);
  };
  return (
    <Fragment>
      <ul className={classes.list}>
        {props.list.length === 0 ? (
          <IngredientItem ingName="" onAdd={addToList} />
        ) : (
          props.list.map((item, index) => (
            <IngredientItem
              key={index}
              onAdd={addToList}
              ingName={item.ingredient_name}
            />
          ))
        )}
      </ul>
      <div className={classes.ingredient_buttons}>
        <Button
          action={() => {
            props.onAdd(ingredientsList);
          }}
        >
          Agregar Ingredientes
        </Button>
        <Button action={props.closeList}>Cancelar</Button>
      </div>
    </Fragment>
  );
};

export default Ingredients;
