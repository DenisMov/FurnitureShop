import { useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useHandleToggleModals from "../../hooks/useHandleToggleModals";
import { removeProductFromCart } from "../../slices/cartSlice";
import { backdrop } from "../../utils/motion";

import "./removeModal.scss";

const RemoveProductModal = () => {
  const { selectedRemoveItem } = useTypedSelector((state) => state.cart);
  const { id, title } = selectedRemoveItem;
  const dispatch = useDispatch();
  const { handleCloseRemoveProductModal } = useHandleToggleModals();
  const handleRemoveProductFromCart = () => {
    dispatch(removeProductFromCart(id));
  };

  return (
    <motion.div
      className="removeModal"
      onClick={() => handleCloseRemoveProductModal()}
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div
        className="removeModal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="removeModal__title">Are you sure?</div>
        <div className="removeModal__item">
          Do you want to remove {title} from your cart?
        </div>
        <div className="removeModal__container">
          <button
            className="removeModal__cancel"
            onClick={() => handleCloseRemoveProductModal()}
          >
            Cancel
          </button>
          <button
            className="removeModal__ok"
            onClick={handleRemoveProductFromCart}
          >
            Yes
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RemoveProductModal;
