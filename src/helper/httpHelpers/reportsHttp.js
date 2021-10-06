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
              }${final + 1 < 10 ? "-0" : "-"}${final +
                1}-${new Date().getDate()}`
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

export const getProductSales = async (id, initDate, finalDate, token) => {
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
      data,
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

export const getTopProducts = async (token) => {
  try {
    const { data: response } = await axios.get("product/mas_vendidos/", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getBottomProducts = async (token) => {
  try {
    const { data: response } = await axios.get("product/menos_vendidos/", {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getMostSeller = async (token) => {
  try {
    const { data: responseSeller } = await axios.get("restaurant/mostSeller/", {
      headers: { Authorization: token },
    });
    const { data: response } = await axios.get(
      `restaurant/one/${responseSeller.data[0].restaurant_id}`,
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

export const getLessSeller = async (token) => {
  try {
    const { data: responseSeller } = await axios.get("restaurant/lessSeller/", {
      headers: { Authorization: token },
    });
    const { data: response } = await axios.get(
      `restaurant/one/${responseSeller.data[0].restaurant_id}`,
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
