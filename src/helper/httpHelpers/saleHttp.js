import { axiosInstance as axios } from "../../config/axiosConfig";

export class Sale {
  constructor(docId, products) {
    this.date = `${new Date().getFullYear()}${
      new Date().getMonth() + 1 < 9 ? "-0" : "-"
    }${new Date().getMonth() + 1}${
      new Date().getDate() < 9 ? "-0" : "-"
    }${new Date().getDate()}`;
    this.time = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.docId = docId;
    this.restaurantId = 1;
    this.status = true;
    this.products = products;
  }
}

export const getSales = async (token) => {
  try {
    const { data: response } = await axios.get("sale/", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createSale = async (saleModel, token) => {
  //Primero sale después bill después payment después el tipo de pago
  try {
    const { data: saleResponse } = await axios.post(
      "sale/",
      {
        sale_date: saleModel.date,
        sale_time: saleModel.time,
        docId: saleModel.docId,
        restaurant_id: saleModel.restaurantId,
        sale_status: saleModel.status,
        products: saleModel.products,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const newSale = { ...saleResponse.data, newBill: saleResponse.newBill };
    return newSale;
  } catch (error) {
    console.log(`Something goes wrong with: ${error.response.data.message}`);
  }
};

export const updateSale = async (saleModel, token) => {
  try {
    const response = await axios.put(
      "sale/",
      {
        sale_date: saleModel.date,
        sale_time: saleModel.time,
        docId: saleModel.docId,
        restaurant_id: saleModel.restaurantId,
        sale_status: saleModel.status,
        products: saleModel.products,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data.message;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteSale = async (id, token) => {
  try {
    const response = await axios.delete(`sale/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};
