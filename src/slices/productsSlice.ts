import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

import { IProduct } from "../types/productTypes";
import { IInitialProductsState } from "../types/slicesTypes";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "fetchProducts",
  () => {
    const { request } = useHttp();
    return request({ url: "http://localhost:3001/products" });
  }
);

const initialState: IInitialProductsState = {
  products: [],
  productsLoadingStatus: "idle",
  // @ts-ignore
  activeFilter: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      if (!state.activeFilter.includes(action.payload)) {
        state.activeFilter.push(action.payload);
      }
    },
    removeFilter: (state, action) => {
      state.activeFilter = state.activeFilter.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state: IInitialProductsState) => {
      state.productsLoadingStatus = "loading";
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state: IInitialProductsState, action) => {
        state.productsLoadingStatus = "idle";
        state.products = action.payload;
      }
    );
    builder.addCase(fetchProducts.rejected, (state: IInitialProductsState) => {
      state.productsLoadingStatus = "error";
    });
  },
});

const { actions, reducer } = productsSlice;

export default reducer;

export const {} = actions;

export const { setFilter, removeFilter } = actions;
