import { axiosInstance as axios } from "../../config/axiosConfig";

export class CreditPay {
  constructor(fees, cardNumber, paymentId, amount, onePay) {
    this.fees = fees;
    this.approval = Math.floor(Math.random() * 1000000).toString();
    this.cardNumber = cardNumber;
    this.paymentId = paymentId;
    this.amount = amount;
    this.onePay = onePay;
  }
}

export const createCreditPay = async (creditPayModel, token) => {
  try {
    const { data: response } = await axios.post(
      "creditPay/",
      {
        approval_number: creditPayModel.approval,
        fees_number: creditPayModel.fees,
        card_number: creditPayModel.cardNumber,
        payment_id: creditPayModel.paymentId,
        amount: creditPayModel.amount,
        onePay: creditPayModel.onePay,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
