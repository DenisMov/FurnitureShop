import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./productItemLiked.scss";

const productItemLiked = ({ productType }) => {
  const { products } = useSelector((state) => state.products);
  const recommendedProducts = products
    .filter((product) => product.productType === productType)
    .slice(0, 4);

  const scrollToUp = () => {
    window.scroll(0, 0);
  };
  const renderProducts = () => {
    return recommendedProducts.map((product) => {
      return (
        <div key={product.id} className="itemLiked__miniBlocks">
          <Link to={`/products/${product.id}`} onClick={scrollToUp}>
            <img
              src={`https://furniture-shop-teal.vercel.app${product.image}`}
              alt={product.title}
            />
            <p className="itemLiked__title">{product.title}</p>
            <p className="itemLiked__price">£{product.price}</p>
          </Link>
        </div>
      );
    });
  };

  return (
    <div className="itemLiked">
      <h2>You might also like</h2>
      <div className="itemLiked__block">
        {renderProducts(recommendedProducts)}
      </div>
      <Link to="/products" onClick={scrollToUp}>
        <button>View collection</button>
      </Link>
    </div>
  );
};

export default productItemLiked;
