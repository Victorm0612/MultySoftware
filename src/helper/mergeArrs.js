export const mergeArrs = (newArr, currentArr) => {
  let totalArr = currentArr.slice();

  if (!currentArr) {
    totalArr = newArr;
    return totalArr;
  }

  for (let element of newArr) {
    let index;
    index = currentArr.findIndex(
      (currentEl) => currentEl.ingredient_id === element.ingredient_id
    );
    if (index !== -1) {
      totalArr[index].amount = element.amount;
    } else {
      totalArr.push(element);
    }
    totalArr = totalArr.filter((element) => element.amount !== 0);
  }

  return totalArr;
};
