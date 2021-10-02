import { axiosInstance as axios } from "../../config/axiosConfig";

export const getFilteredUsers = async (type, token) => {
  try {
    const { data: response } = await axios.get("users/", {
      headers: {
        Authorization: token,
      },
    });
    return response.data.filter((user) => user.user_type === type);
  } catch (error) {
    return error.response.data.message;
  }
};
