import { axiosInstance as axios } from "../../config/axiosConfig";

export class Bill {
  constructor(saleId, subtotal, totalIva, totalDiscount) {
    this.nit = 1234567890;
    this.saleId = saleId;
    this.billTime = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.billDate = `${new Date().getFullYear()}${
      new Date().getMonth() + 1 < 9 ? "-0" : "-"
    }${new Date().getMonth() + 1}${
      new Date().getDate() < 9 ? "-0" : "-"
    }${new Date().getDate()}`;
    this.subtotal = subtotal;
    this.totalIva = totalIva;
    this.totalDiscount = totalDiscount;
    this.billStatus = true;
  }
}

export const createBill = async (billModel, token) => {
  try {
    const { data: response } = axios.post(
      "bill/",
      {
        nit: billModel.nit,
        sale_id: billModel.saleId,
        bill_time: billModel.billTime,
        bill_date: billModel.billDate,
        subtotal: billModel.subtotal,
        totalIva: billModel.totalIva,
        total_discount: billModel.totalDiscount,
        bill_status: billModel.billStatus,
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
