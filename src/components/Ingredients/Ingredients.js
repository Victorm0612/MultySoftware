import IngredientItem from "./IngredientItem";
import classes from "./shared.module.css";
const Ingredients = (props) => {
  return (
    <ul className={classes.list}>
      {props.list.length === 0 ? (
        <IngredientItem ingName="" />
      ) : (
        props.list.map((item, index) => (
          <IngredientItem key={index} ingName={item.ingredient_name} />
        ))
      )}
    </ul>
  );
};

export default Ingredients;
