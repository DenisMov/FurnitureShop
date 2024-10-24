import { IProduct } from "./productTypes";

export interface IInitialProductsState {
  products: IProduct[];
  productsLoadingStatus: "idle" | "loading" | "error";
  activeFilter: string[];
}

export interface ICartProduct extends IProduct {
  quantity: number;
}

export interface IInitialCartState {
  cartProducts: ICartProduct[];
  cartTotal: number;
  isOpenAddProductModal: boolean;
  isRemoveProductModalOpen: boolean;
  selectedRemoveItem: {
    id: number | null;
    title: string | null;
  };
  orderStatus: "idle" | "error" | "success";
}
