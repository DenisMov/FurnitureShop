import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

import { IProduct } from "../types/productTypes";
import { IInitialProductsState } from "../types/slicesTypes";

export const fetchProducts = createAsyncThunk<IProduct[]>(
  "products/fetchProducts",
  async () => {
    const { request } = useHttp();
    return await request({ url: "http://localhost:3001/products" });
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
    setFilter: (state, action: PayloadAction<string>) => {
      if (!state.activeFilter.includes(action.payload)) {
        state.activeFilter.push(action.payload);
      }
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      state.activeFilter = state.activeFilter.filter(
        (item) => item !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.productsLoadingStatus = "loading";
    });
    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<IProduct[]>) => {
        state.productsLoadingStatus = "idle";
        state.products = action.payload;
      }
    );

    builder.addCase(fetchProducts.rejected, (state) => {
      state.productsLoadingStatus = "error";
    });
  },
});

export const { setFilter, removeFilter } = productsSlice.actions;
export default productsSlice.reducer;
