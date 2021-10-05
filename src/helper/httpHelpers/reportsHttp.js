import { axiosInstance as axios } from "../../config/axiosConfig";
export const getAllSales = async (
  optionSelected,
  init,
  final,
  initDate,
  finalDate,
  token
) => {
  try {
    const { data: response } = await axios.post(
      "sale/dateRange/sales",
      {
        initial_date:
          +optionSelected === 0
            ? `${
                final < init
                  ? new Date().getFullYear() - 1
                  : new Date().getFullYear()
              }${init < 10 ? "-0" : "-"}${init}-${new Date().getDate()}`
            : initDate,
        end_date:
          +optionSelected === 0
            ? `${
                final < init
                  ? new Date().getFullYear() + 1
                  : new Date().getFullYear()
              }${final + 1 < 10 ? "-0" : "-"}${
                final + 1
              }-${new Date().getDate()}`
            : finalDate,
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

export const getProductSales = async (id, initDate, finalDate) => {
  let data = {
    ini_date: initDate,
    final_date: finalDate,
  };
  if (!initDate && !finalDate) {
    data = null;
  }
  try {
    const { data: response } = await axios.post(
      `product/ultimos6Meses/${id}`,
      data
    );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getTopProducts = async () => {
  try {
    const { data: response } = await axios.get("product/mas_vendidos/");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getBottomProducts = async () => {
  try {
    const { data: response } = await axios.get("product/menos_vendidos/");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getMostSeller = async () => {
  try {
    const { data: response } = await axios.get("restaurant/mostSeller/");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getLessSeller = async () => {
  try {
    const { data: response } = await axios.get("restaurant/lessSeller/");
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
