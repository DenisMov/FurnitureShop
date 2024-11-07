import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { addProductToCart } from "../../slices/cartSlice";
import { fetchProducts } from "../../slices/productsSlice";

import Portal from "../portal/portal";
import Spinner from "../Spinner/Spinner";
import Counter from "../counter/Counter";
import CartModal from "../cartModal/CartModal";
import ProductItemLiked from "../productItemLiked/productItemLiked";

import { IProduct } from "../../types/productTypes";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { AppDispatch } from "../../store";

import controlBodyOverflow from "../../utils/controlBodyOverflow";
import useHandleToggleModals from "../../hooks/useHandleToggleModals";
import "./productInfo.scss";

const ProductInfo = () => {
  const [quantity, setQuantity] = useState(1);
  const { products, productsLoadingStatus } = useTypedSelector(
    (state) => state.products
  );
  const { isOpenAddProductModal } = useTypedSelector((state) => state.cart);
  const { handleOpenAddProductModal } = useHandleToggleModals();

  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleAddProductToCart = (product: IProduct) => {
    dispatch(addProductToCart({ ...product, quantity }));
    setQuantity(1);
  };

  if (productsLoadingStatus === "loading") {
    return <Spinner />;
  }

  controlBodyOverflow(isOpenAddProductModal);

  //@ts-ignore
  const selectedProduct = products.find((item: IProduct) => item.id == id);

  if (!selectedProduct) {
    return <div>Product not found</div>;
  }

  const { productType, title, price, description, image } = selectedProduct;

  return (
    <>
      {isOpenAddProductModal ? (
        <Portal>
          <CartModal />
        </Portal>
      ) : null}

      <div className="product">
        <img
          src={`https://furniture-shop-teal.vercel.app${image}`}
          alt="image"
          className="product__image"
        />
        <div className="product__info">
          <div className="product__title">{title}</div>
          <div className="product__price">£{price}</div>
          <div className="product__descr">Description</div>
          <div className="product__descr-text">
            {description}
            <br />
            <br />
            <ul>
              <li>Premium material</li>
              <li>Handmade upholstery</li>
              <li>Quality timeless classic</li>
            </ul>
          </div>

          <div className="product__dimensions">Dimensions</div>
          <div className="product__dimensions-info">
            <div className="product__height">
              Height
              <span>110cm</span>
            </div>
            <div className="product__width">
              Width
              <span>75cm</span>
            </div>
            <div className="product__depth">
              Depth
              <span>50cm</span>
            </div>
          </div>
          <div className="product__footer">
            <div className="product__amount-text">Amount:</div>
            <Counter value={quantity} onChange={setQuantity} />
            <button
              className="product__add"
              onClick={() => {
                handleAddProductToCart(selectedProduct);
                handleOpenAddProductModal();
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <ProductItemLiked productType={productType} />
    </>
  );
};

export default ProductInfo;
