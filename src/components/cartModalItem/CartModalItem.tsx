import { useDispatch } from "react-redux";
import { FC, useEffect, useState } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Counter from "../counter/Counter";
import { updateQuantity } from "../../slices/cartSlice";

interface ICartModalItemProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

const CartModalItem: FC<ICartModalItemProps> = ({
  id,
  title,
  description,
  price,
  image,
}) => {
  const { cartProducts } = useTypedSelector((state) => state.cart);

  const dispatch = useDispatch();

  const cartItem = cartProducts.find((item) => item.id === id);
  const initialQuantity = cartItem ? cartItem.quantity : 0;
  const [value, setValue] = useState(initialQuantity);

  useEffect(() => {
    dispatch(updateQuantity({ id, value }));
  }, [value]);

  const descriptionText =
    description.length > 75 ? description.slice(0, 75) + "..." : description;

  return (
    <div className="cartModal__item">
      <div className="cartModal__item-container">
        <img src={`https://furniture-shop-teal.vercel.app${image}`} alt="img" />
        <div className="cartModal__item-info">
          <div className="cartModal__item-title">{title}</div>
          <div className="cartModal__item-descr">{descriptionText}</div>
          {/* <div className="cartModal__item-price">£{price}</div> */}
        </div>
      </div>
      <Counter value={value} onChange={setValue} />
      <div className="cartModal__item-price">£{price * value}</div>
    </div>
  );
};

export default CartModalItem;
