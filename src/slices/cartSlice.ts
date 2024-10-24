import { createSlice } from "@reduxjs/toolkit";
import { IInitialCartState, ICartProduct } from "../types/slicesTypes";

const initialState: IInitialCartState = {
  cartProducts: [],
  cartTotal: 0,
  isOpenAddProductModal: false,
  isRemoveProductModalOpen: false,
  selectedRemoveItem: {
    id: null,
    title: null,
  },
  orderStatus: "idle",
};

const updateCartTotal = (state: IInitialCartState) => {
  state.cartTotal = state.cartProducts.reduce(
    (accumulator: number, currentValue: ICartProduct) =>
      accumulator + currentValue.quantity * currentValue.price,
    0
  );
};

const findProductIndex = (cartProducts: ICartProduct[], productId: number) => {
  return cartProducts.findIndex((item) => item.id === productId);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action) => {
      const productIndex = findProductIndex(
        state.cartProducts,
        action.payload.id
      );

      if (productIndex !== -1) {
        state.cartProducts[productIndex].quantity += action.payload.quantity;
      } else {
        state.cartProducts.push(action.payload);
      }

      updateCartTotal(state);
    },
    removeProductFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );

      state.isRemoveProductModalOpen = false;
      updateCartTotal(state);
    },
    selectRemoveItem: (state, action) => {
      state.selectedRemoveItem = {
        id: action.payload.id,
        title: action.payload.title,
      };
    },
    updateQuantity: (state, action) => {
      const productIndex = findProductIndex(
        state.cartProducts,
        action.payload.id
      );

      if (productIndex !== -1) {
        const newQuantity =
          action.payload.value - state.cartProducts[productIndex].quantity;
        state.cartProducts[productIndex].quantity += newQuantity;
      }

      updateCartTotal(state);
    },
    toggleAddCartModal: (state, action) => {
      state.isOpenAddProductModal = action.payload;
    },
    toggleRemoveCartModal: (state, action) => {
      state.isRemoveProductModalOpen = action.payload;
    },
    setOrderStatus: (state, action) => {
      state.orderStatus = action.payload;
    },
  },
});

const { actions, reducer } = cartSlice;

export default reducer;

export const {
  addProductToCart,
  removeProductFromCart,
  selectRemoveItem,
  updateQuantity,
  toggleAddCartModal,
  toggleRemoveCartModal,
  setOrderStatus,
} = actions;
