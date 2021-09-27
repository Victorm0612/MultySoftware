export const sliceArray = (arr) => {
  let tmp = arr;
  let total = [];
  for (let index = 0; index < arr.length; index++) {
    if (tmp.length >= 4) {
      total.push(tmp.slice(0, 4));
      tmp = tmp.slice(4);
    } else {
      total.push(tmp);
      break;
    }
  }
  return total;
};
