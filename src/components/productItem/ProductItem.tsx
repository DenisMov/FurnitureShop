import { Link } from "react-router-dom";

import "./productItem.scss";
import { FC } from "react";

interface IProductItemProps {
  title: string;
  id: number;
  price: number;
  image: string;
}

const ProductItem: FC<IProductItemProps> = ({ image, title, price, id }) => {
  return (
    <Link to={`${id}`}>
      <div className="productItem">
        <div className="productItem__img">
          <img src={`http://localhost:3001${image}`} alt="photo" />
        </div>
        <div className="productItem__title">{title}</div>
        <div className="productItem__price">£{price}</div>
      </div>
    </Link>
  );
};

export default ProductItem;
