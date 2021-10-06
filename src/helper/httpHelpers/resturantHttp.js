import { axiosInstance as axios } from "../../config/axiosConfig";

export class Restaurant {
  constructor(restaurantName, address, phone, initTime, finalTime, status) {
    this.restaurantName = restaurantName;
    this.address = address;
    this.phone = phone;
    this.initTime = initTime;
    this.finalTime = finalTime;
    this.status = status;
  }
}

export const getRestaurants = async (token) => {
  try {
    const { data: response } = await axios.get("restaurant/", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const createRestaurant = async (model, token) => {
  console.log({
    restaurant_name: model.restaurantName,
    restaurant_address: model.address,
    phone: model.phone,
    ini_attention_time: model.initTime,
    final_attention_time: model.finalTime,
    restaurant_status: model.status,
  });
  try {
    const { data: response } = await axios.post(
      "restaurant/",
      {
        restaurant_name: model.restaurantName,
        restaurant_address: model.address,
        phone: model.phone,
        ini_attention_time: model.initTime,
        final_attention_time: model.finalTime,
        restaurant_status: model.status,
      },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const updateRestaurant = async (model, id, token) => {
  try {
    const { data: response } = await axios.put(
      `restaurant/${id}`,
      {
        restaurant_name: model.restaurantName,
        restaurant_address: model.address,
        phone: model.phone,
        ini_attention_time: model.initTime,
        final_attention_time: model.finalTime,
        restaurant_status: model.status,
      },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const deleteRestaurant = async (id, token) => {
  try {
    const { data: response } = await axios.delete(`restaurant/${id}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
