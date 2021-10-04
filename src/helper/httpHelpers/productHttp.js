import { axiosInstance as axios } from "../../config/axiosConfig";

export const getAllProducts = async () => {
  try {
    const { data: response } = await axios.get("product/");
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};
