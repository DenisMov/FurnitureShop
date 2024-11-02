import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { selectRemoveItem, updateQuantity } from "../../slices/cartSlice";

import Counter from "../counter/Counter";
import useHandleToggleModals from "../../hooks/useHandleToggleModals";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface ICartItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const CartItem: FC<ICartItemProps> = ({
  id,
  title,
  description,
  price,
  image,
}) => {
  const { cartProducts } = useTypedSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { handleOpenRemoveProductModal } = useHandleToggleModals();

  const selectedCartItem = cartProducts.find((item) => item.id === id);
  const initialQuantity = selectedCartItem ? selectedCartItem.quantity : 0;
  const [value, setValue] = useState(initialQuantity);

  useEffect(() => {
    dispatch(updateQuantity({ id, value }));
  }, [value]);

  const descriptionText =
    description.length > 75 ? description.slice(0, 75) + "..." : description;

  return (
    <div className="cart__item">
      <div
        className="cart__item-remove"
        onClick={() => {
          handleOpenRemoveProductModal();
          dispatch(selectRemoveItem({ id, title }));
        }}
      >
        &#10006;
      </div>
      <div className="cart__item-container">
        <div className="cart__item-info">
          <img
            src={`http://localhost:3001${image}`}
            alt="image"
            className="cart__item-img"
          />
          <div style={{ marginTop: 12 }}>
            <div className="cart__item-title">{title}</div>
            <div className="cart__item-descr">{descriptionText}</div>
            {/* <div className="cart__item-price">£{price}</div> */}
          </div>
        </div>
      </div>
      <Counter value={value} onChange={setValue} />
      <div className="cart__item-total">£{price * value}</div>
    </div>
  );
};

export default CartItem;
