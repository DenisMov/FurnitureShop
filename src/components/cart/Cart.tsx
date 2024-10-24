import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypedSelector";
import Portal from "../portal/portal";
import { backdrop } from "../../utils/motion";
import controlBodyOverflow from "../../utils/controlBodyOverflow";

import CartItem from "../cartItem/CartItem";
import RemoveProductModal from "../removeModal/RemoveModal";

//@ts-ignore
import emptyCart from "../../assets/icons/emptyCart.svg";
import "./cart.scss";

const Cart = () => {
  const { cartProducts, cartTotal, isRemoveProductModalOpen } =
    useTypedSelector((state) => state.cart);

  const { isAuth } = useTypedSelector((state) => state.user);

  controlBodyOverflow(isRemoveProductModalOpen);

  const isEmptyCart = cartProducts.length === 0;

  const cartProductsRender = cartProducts.map((item) => {
    return <CartItem {...item} key={item.id} />;
  });

  return (
    <motion.div
      className="cart"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <h1 className="cart__title">Your shopping cart</h1>
      {isRemoveProductModalOpen ? (
        <Portal>
          <RemoveProductModal />
        </Portal>
      ) : null}
      {!isEmptyCart ? (
        <>
          <div className="cart__info">
            <div className="cart__info-mark">Product</div>
            <div className="cart__info-mark">Quantity</div>
            <div className="cart__info-mark">Total</div>
          </div>
          <div className="cart__items">{cartProductsRender}</div>
          <div className="cart__footer">
            <div className="flex-wrapper">
              <div className="cart__subtotal">
                <span>Subtotal</span>
                <span className="cart__subtotal-price">£{cartTotal}</span>
              </div>
            </div>
            <div className="cart__descr">
              Taxes and shipping are calculated at checkout
            </div>
            <div className="flex-wrapper">
              <Link to="/checkout">
                <button className="cart__checkout" disabled={!isAuth}>
                  Go to checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="empty__container">
          <img src={emptyCart} alt="emptyCart" className="empty__icon" />
          <div className="empty__title">Your cart is empty :(</div>
          <Link to="/products">
            <button className="empty__button">Go shopping</button>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default Cart;
