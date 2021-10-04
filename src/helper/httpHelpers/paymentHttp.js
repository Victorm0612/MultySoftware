import { axiosInstance as axios } from "../../config/axiosConfig";

export class Payment {
  constructor(description, amount, billId) {
    this.description = description;
    this.amount = amount;
    this.billId = billId;
    this.time = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.date = `${new Date().getFullYear()}${
      new Date().getMonth() + 1 < 9 ? "-0" : "-"
    }${new Date().getMonth() + 1}${
      new Date().getDate() < 9 ? "-0" : "-"
    }${new Date().getDate()}`;
    this.status = true;
  }
}

export const createPayment = async (paymentModel, token) => {
  try {
    const { data: response } = await axios.post(
      "payment/",
      {
        pay_description: paymentModel.description,
        pay_date: paymentModel.date,
        pay_time: paymentModel.time,
        pay_status: paymentModel.status,
        amount: paymentModel.amount,
        bill_id: paymentModel.billId,
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
