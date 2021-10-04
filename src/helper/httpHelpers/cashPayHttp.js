import { axiosInstance as axios } from "../../config/axiosConfig";

export class CashPay {
  constructor(payId, amount, onePay, payerId) {
    this.payId = payId;
    this.amount = amount;
    this.onePay = onePay;
    this.payerId = payerId;
  }
}

export const createCashPay = async (cashPayModel, token) => {
  try {
    const { data: response } = await axios.post(
      "cashPay/",
      {
        payment_id: cashPayModel.payId,
        amount: cashPayModel.amount,
        onePay: cashPayModel.onePay,
        payer_id: cashPayModel.payerId,
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
