import { createStore } from "redux";
import actionTypes from "./actionsType";

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || {
    isLogged: false,
    token: null,
    firstName: "",
    typeUser: "",
    id: "",
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      const data = {
        isLogged: action.isLogged,
        token: action.token,
        firstName: action.firstName,
        typeUser: action.typeUser,
        id: action.id,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return {
        userData: { ...data },
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("user");
      return {
        userData: {
          isLogged: false,
          token: null,
          firstName: "",
          typeUser: "",
          id: "",
        },
      };
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;
