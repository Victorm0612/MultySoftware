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

export const getProductSales = async (id) => {
  try {
    const { data: response } = await axios.get(`product/ultimos6Meses/${id}`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
};
