import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  isLogged: false,
  token: null,
  firstName: "",
  typeUser: 1,
  id: "",
  userStatus: true,
  clientDocId: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const data = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data, clientDocId: "" })
      );
      return {
        ...data,
        clientDocId: "",
      };
    },
    setClientId(state, action) {
      state.clientDocId = action.payload;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout(state) {
      localStorage.removeItem("user");
      return {
        isLogged: false,
        token: null,
        firstName: "",
        typeUser: "",
        id: "",
        userStatus: true,
        clientDocId: "",
      };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
