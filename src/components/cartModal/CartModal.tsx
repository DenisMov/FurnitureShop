import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import { backdrop } from "../../utils/motion";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import useHandleToggleModals from "../../hooks/useHandleToggleModals";
import CartModalItem from "../cartModalItem/CartModalItem";

import "./cartModal.scss";

const CartModal = () => {
  const { handleCloseAddProductModal } = useHandleToggleModals();
  const { cartProducts, cartTotal } = useTypedSelector((state) => state.cart);
  const navigate = useNavigate();

  const cartProductsRender = cartProducts.map((item) => {
    return <CartModalItem {...item} key={item.id} />;
  });

  return (
    <motion.div
      className="cartModal"
      onClick={() => handleCloseAddProductModal()}
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="cartModal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cartModal__container">
          <div className="cartModal__header">
            <h1 className="cartModal__title">Your shopping cart</h1>
            <div
              className="cartModal__cancel"
              onClick={() => handleCloseAddProductModal()}
            >
              &#10006;
            </div>
          </div>
          <div className="cartModal__info">
            <span>Product</span>
            <span>Quantity</span>
            <span>Total</span>
          </div>

          <div className="cartModal__items">{cartProductsRender}</div>

          <div className="cartModal__checkout">
            <div className="cartModal__total">
              <span>Subtotal</span>
              <span>£{cartTotal}</span>
            </div>
            <button
              className="cartModal__button"
              onClick={() => {
                navigate("../cart");
                handleCloseAddProductModal();
              }}
            >
              Go to cart
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CartModal;
