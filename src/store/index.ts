import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType } from "../types";
import { combineReducers } from "redux";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cartProducts: [],
  },
  reducers: {
    addToCart: (state: any, action: PayloadAction<ProductType>) => {
      state.cartProducts.push(action.payload);
    },
    removeFromCart: (state: any, action) => {
      state.cartProducts = state.cartProducts.filter(
        (i: ProductType) => i.id !== action.payload
      );
    },
    addAddresse: (state: any, action: PayloadAction<number>) => {
      state.cartProducts.push(action.payload);
    },
  },
});

const addresseSlice = createSlice({
  name: "addresseSlice",
  initialState: {
    addresses: [],
  },
  reducers: {
    addAddresse: (state: any, action: PayloadAction<string>) => {
      state.addresses.push(action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export const { addAddresse } = addresseSlice.actions;

const store = configureStore({
  reducer: combineReducers({
    cartReducer: cartSlice.reducer,
    addresseReducer: addresseSlice.reducer,
  }),
  devTools: true,
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
