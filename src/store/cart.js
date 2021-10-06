import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("cart")) || {
  products: [],
  totalAmount: 0,
  totalPrice: 0,
  orderRequested: false,
  mainDiscount: "",
};

const getMaxValue = (arr) =>
  Math.max(
    ...arr.map((product) => {
      if (product.discounts.length === 0) {
        return 0;
      }
      return Math.max(
        ...product.discounts.map((discount) => discount.discount_value)
      );
    })
  ) / 100;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct(state, action) {
      const index = state.products.findIndex(
        (product) => product.product_id === action.payload.product_id
      );
      if (index === -1) {
        state.products.push(action.payload);
        state.totalAmount++;
        state.totalPrice += action.payload.price;
        state.mainDiscount = getMaxValue(state.products);
      } else {
        state.products[index].amount++;
        state.totalAmount++;
        state.totalPrice += action.payload.price;
        state.mainDiscount = getMaxValue(state.products);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeProduct(state, action) {
      const index = state.products.findIndex(
        (product) => product.product_id === action.payload
      );
      state.totalPrice -= state.products[index].price;
      const newState = state.products.filter(
        (product) => product.product_id !== action.payload
      );
      state.products = newState;
      state.totalAmount--;
      state.mainDiscount = getMaxValue(state.products);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseAmount(state, action) {
      const index = state.products.findIndex(
        (product) => product.product_id === action.payload
      );
      state.products[index].amount++;
      state.totalAmount++;
      state.totalPrice += state.products[index].price;
      state.mainDiscount = getMaxValue(state.products);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    decreaseAmount(state, action) {
      const index = state.products.findIndex(
        (product) => product.product_id === action.payload
      );
      state.products[index].amount--;
      state.totalAmount--;
      state.totalPrice -= state.products[index].price;
      state.mainDiscount = getMaxValue(state.products);
      localStorage.setItem("cart", JSON.stringify(state));
    },
    setOrder(state, action) {
      state.orderRequested = action.payload;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    orderCompleted(state) {
      localStorage.removeItem("cart");
      return {
        products: [],
        totalAmount: 0,
        totalPrice: 0,
        orderRequested: false,
        mainDiscount: "",
      };
    },
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
