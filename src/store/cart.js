import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  products: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index === -1) {
        state.products.push(action.payload);
        state.totalAmount++;
      } else {
        state.products[index].amount++;
        state.totalAmount++;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeProduct(state, action) {
      const newState = state.products.filter(
        (product) => product.id !== action.payload
      );
      state.products = newState;
      state.totalAmount--;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseAmount(state, action) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].amount++;
      state.totalAmount++;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseAmount(state, action) {
      const index = state.products.findIndex(
        (product) => product.id === action.payload
      );
      state.products[index].amount--;
      state.totalAmount--;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
