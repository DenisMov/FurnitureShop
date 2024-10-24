import { useDispatch } from "react-redux";

import { toggleAddCartModal, toggleRemoveCartModal } from "../slices/cartSlice";

const useHandleToggleModals = () => {
  const dispatch = useDispatch();

  const handleOpenAddProductModal = () => {
    dispatch(toggleAddCartModal(true));
  };

  const handleOpenRemoveProductModal = () => {
    dispatch(toggleRemoveCartModal(true));
  };

  const handleCloseAddProductModal = () => {
    dispatch(toggleAddCartModal(false));
  };

  const handleCloseRemoveProductModal = () => {
    dispatch(toggleRemoveCartModal(false));
  };

  return {
    handleOpenAddProductModal,
    handleOpenRemoveProductModal,
    handleCloseAddProductModal,
    handleCloseRemoveProductModal,
  };
};

export default useHandleToggleModals;
