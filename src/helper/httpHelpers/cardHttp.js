import { axiosInstance as axios } from "../../config/axiosConfig";
export class CardToPay {
  constructor(number, owner, expDate, type, bankId) {
    this.number = number;
    this.owner = owner;
    this.expDate = expDate;
    this.type = type;
    this.bankId = bankId;
  }
}

export const createCard = async (cardModel, token) => {
  try {
    const cardResponse = await axios.get(`card/${cardModel.number}`, {
      headers: {
        Authorization: token,
      },
    });
    if (cardResponse.data) {
      return cardResponse.data;
    }
    const { data: response } = await axios.post(
      "card/",
      {
        card_number: cardModel.number,
        owner_id: cardModel.owner,
        exp_date: cardModel.expDate,
        card_type: cardModel.type,
        bank: cardModel.bankId,
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
