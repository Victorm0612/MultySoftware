import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  isLogged: false,
  token: null,
  firstName: "",
  typeUser: 1,
  id: "",
  userStatus: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const data = action.payload;
      localStorage.setItem("user", JSON.stringify(data));
      return {
        ...data,
      };
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
      };
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
