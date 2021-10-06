import { axiosInstance as axios } from "../../config/axiosConfig";

export class Sale {
  constructor(docId, products, address) {
    this.date = `${new Date().getFullYear()}${
      new Date().getMonth() + 1 < 9 ? "-0" : "-"
    }${new Date().getMonth() + 1}${
      new Date().getDate() < 9 ? "-0" : "-"
    }${new Date().getDate()}`;
    this.time = `${new Date().getHours()}:${new Date().getMinutes()}`;
    this.docId = docId;
    this.restaurantId = address.label;
    this.status = true;
    this.products = products;
  }
}
// Converts numeric degrees to radians
const toRad = (value) => {
  return (value * Math.PI) / 180;
};

const getLatLong = async (address) => {
  try {
    const { response } = await axios.get(
      `http://api.positionstack.com/v1/forward?access_key=888e7bfbf3624c0effad1ebf349603f4&query=${address}`
    );
    return {
      latitude: response.data[0].latitude,
      longitude: response.data[0].longitude,
    };
  } catch (error) {
    return "error " + error;
  }
};
//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
const calcCrow = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const newLat1 = toRad(lat1);
  const newLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(newLat1) *
      Math.cos(newLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
};

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
    const { data: restaurantsRes } = await axios.get("restaurant/", {
      headers: {
        Authorization: token,
      },
    });
    const allRestaurantsAddress = restaurantsRes.data.map(
      (restaurant) => restaurant.restaurant_address
    );
    const allLatAndLong = await Promise.all(
      allRestaurantsAddress.map(async (rest) => getLatLong(rest))
    );

    const latLongMe = await getLatLong(saleModel.restaurantId);
    const distanceBtwnRestaurantAndMe = allLatAndLong.map((resAddress) =>
      calcCrow(
        latLongMe.latitude,
        latLongMe.longitude,
        resAddress.latitude,
        resAddress.longitude
      )
    );

    const closePlace = Math.max(...distanceBtwnRestaurantAndMe);
    const index = distanceBtwnRestaurantAndMe.findIndex(
      (distance) => distance === closePlace
    );

    const { data: saleResponse } = await axios.post(
      "sale/",
      {
        sale_date: saleModel.date,
        sale_time: saleModel.time,
        docId: saleModel.docId,
        restaurant_id: restaurantsRes.data[index].id,
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
