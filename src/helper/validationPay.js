export const validationPay = (arr, methodToPay, totalPrice, onePay) => {
  console.log(arr, methodToPay, totalPrice, onePay);
  if (onePay && +methodToPay.total_amount !== totalPrice) {
    return "El método de pago debe cubrir la totalidad del valor a pagar.";
  }
  if (
    arr.length !== 0 &&
    +methodToPay.total_amount !== totalPrice - +arr[0].total_amount
  ) {
    return "El segundo método de pago debe cubrir el restante del total a pagar.";
  }
  if (
    (!onePay &&
      arr.length === 0 &&
      totalPrice < 50000 &&
      +methodToPay.total_amount < totalPrice * 0.5) ||
    (totalPrice >= 50000 && +methodToPay.total_amount < totalPrice * 0.2)
  ) {
    return "El valor a pagar es demasiado bajo.";
  }
  if (
    !onePay &&
    arr.length === 0 &&
    +methodToPay.total_amount > totalPrice * 0.8
  ) {
    return "El valor es superior al permitido.";
  }
  return "";
};
