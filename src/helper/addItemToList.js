export const addItem = (list, ingredientsList, newIngredient, callback) => {
  // OldArr: contains all ingredients that I want to add to my product
  let oldArr = ingredientsList;
  let newArr;

  //Add id to newIngredient that I want to add to ingredientsList
  const itemId = list.find(
    (ing) => ing.ingredient_name === newIngredient.ingredient_name
  ).id;
  let tmp = {
    ingredient_name: newIngredient.ingredient_name,
    ingredient_id: itemId,
    amount: newIngredient.amount,
  };

  if (oldArr.length === 0) {
    return callback((prevState) => [...prevState, tmp]);
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
    return callback(newArr);
  }
  return callback([...oldArr, tmp]);
};
