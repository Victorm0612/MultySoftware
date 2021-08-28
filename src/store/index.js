import { createStore } from "redux";
import actionTypes from "./actionsType";

const initialState = {
  userData: JSON.parse(localStorage.getItem("user")) || {
    isLogged: false,
    token: null,
    firstName: "",
  },
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      const userData = {
        isLogged: action.isLogged,
        token: action.token,
        firstName: action.firstName,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return {
        userData: { ...userData },
      };
    case actionTypes.LOGOUT:
      localStorage.removeItem("user");
      return {
        userData: {
          isLogged: false,
          token: null,
          firstName: "",
        },
      };
    default:
      return state;
  }
};

const store = createStore(authReducer);

export default store;
