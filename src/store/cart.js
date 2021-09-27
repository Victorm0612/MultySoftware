import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state) {},
    removeProduct(state) {},
    setProduct(state) {},
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
