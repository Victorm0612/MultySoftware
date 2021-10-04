import { axiosInstance as axios } from "../../config/axiosConfig";

export class DebitPay {
  constructor(type = "Ahorros", cardNumber, amount, onePay, paymentId) {
    this.type = type;
    this.cardNumber = cardNumber;
    this.amount = amount;
    this.onePay = onePay;
    this.paymentId = paymentId;
  }
}

export const createDebitPay = async (debitPayModel, token) => {
  try {
    const { data: response } = await axios.post(
      "debitPay/",
      {
        debit_type: debitPayModel.type,
        card_number: debitPayModel.cardNumber,
        amount: debitPayModel.amount,
        onePay: debitPayModel.onePay,
        payment_id: debitPayModel.paymentId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
