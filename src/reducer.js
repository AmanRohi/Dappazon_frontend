import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  products: [],
  orders: [],
  activeProduct: null,
  activeOrder: null,
  walletUser: null,
};

const slice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setActiveProduct: (state, action) => {
      state.activeProduct = action.payload;
    },
    addOrder: (state, action) => {
      state.orders = [...state.orders, action.payload];
    },
    setActiveOrder: (state, action) => {
      state.activeOrder = action.payload;
    },
    setWalletUser: (state, action) => {
      state.walletUser = action.payload;
    },
  },
});
export const {
  setUser,
  setProducts,
  setOrders,
  setActiveProduct,
  addOrder,
  setActiveOrder,
  setWalletUser,
} = slice.actions;
export default slice.reducer;
