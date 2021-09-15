export function addToList(
  newIngredient,
  ingredientsToAdd,
  allIngredients,
  callback
) {
  let oldArr = ingredientsToAdd;
  let newArr;
  const itemId = allIngredients.find(
    (ing) => ing.ingredient_name === newIngredient.ingredient_name
  ).id;
  let tmp = {
    ingredient_name: newIngredient.ingredient_name,
    ingredient_id: itemId,
    amount: newIngredient.amount,
  };
  if (oldArr.length === 0) {
    return callback([...oldArr, tmp]);
  }
  const found = oldArr.find(
    (element) => element.ingredient_id === tmp.ingredient_id
  );
  if (!!found) {
    newArr = oldArr.map((element) => {
      if (element.ingredient_id === tmp.ingredient_id) {
        element.amount = element.amount + tmp.amount;
      }
      return element;
    });
    return callback(newArr);
  }
  return callback([...oldArr, tmp]);
}
