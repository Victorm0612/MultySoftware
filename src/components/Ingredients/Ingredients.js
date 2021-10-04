import { useState } from "react";
import { Fragment } from "react/cjs/react.production.min";
import Button from "../UI/Button";
import IngredientItem from "./IngredientItem";
import classes from "./shared.module.css";
import { mergeArrs } from "../../helper/mergeArrs";
import { addItem } from "../../helper/addItemToList";

const Ingredients = (props) => {
  const [ingredientsList, setIngredientsList] = useState([]);

  let allIngredientsFixed = props.list.map((element) => {
    element.amount = 0;
    if (props.ingredientsToAdd.length === 0) {
      return element;
    }
    const found = props.ingredientsToAdd.find(
      (ingredient) => ingredient.ingredient_id === element.id
    );
    if (!!found) {
      element.amount = found.amount;
    }
    return element;
  });

  const addToList = (newIngredient) => {
    addItem(props.list, ingredientsList, newIngredient, setIngredientsList);
  };

  const sendIngredients = (e) => {
    e.preventDefault();
    let currentArr = props.ingredientsToAdd;
    let totalArr;
    totalArr = mergeArrs(ingredientsList, currentArr);
    props.onAdd(totalArr);
  };
  return (
    <Fragment>
      <ul data-test="ingredients-component" className={classes.list}>
        {props.list.length === 0 ? (
          <IngredientItem ingName="" onAdd={addToList} />
        ) : (
          allIngredientsFixed.map((item, index) => (
            <IngredientItem
              key={index}
              onAdd={addToList}
              ingName={item.ingredient_name}
              amount={item.amount}
            />
          ))
        )}
      </ul>
      <div className={classes.ingredient_buttons}>
        <Button data-test="button-add" action={sendIngredients}>
          Agregar Ingredientes
        </Button>
        <Button tag="close" data-test="button-cancel" action={props.closeList}>
          Cancelar
        </Button>
      </div>
    </Fragment>
  );
};

export default Ingredients;
