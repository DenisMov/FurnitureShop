import { configureStore } from "@reduxjs/toolkit";
import products from "../slices/productsSlice";
import cart from "../slices/cartSlice";
import user, { loadUserFromLocalStorage } from "../slices/userSlice";

const store = configureStore({
  reducer: { products, cart, user },
  devTools: process.env.NODE_ENV !== "production",
});
store.dispatch(loadUserFromLocalStorage());
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
