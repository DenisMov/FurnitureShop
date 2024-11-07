import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { backdrop } from "../../utils/motion";
import { fetchProducts } from "../../slices/productsSlice";
import ProductItem from "../productItem/ProductItem";
import Spinner from "../Spinner/Spinner";
import { useTypedSelector } from "../../hooks/useTypedSelector";

import { IProduct } from "../../types/productTypes";
import "./productsList.scss";
import { AppDispatch } from "../../store";

const ProductsList = () => {
  const { products, productsLoadingStatus, activeFilter } = useTypedSelector(
    (state) => state.products
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    fetch("https://furniture-shop-teal.vercel.app/api/products")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    if (activeFilter.length === 0) return products;

    const priceFilters = ["0-100", "101-250", "250+"];
    const hasPriceFilter = activeFilter.some((filter) =>
      priceFilters.includes(filter)
    );
    const hasProductTypeFilter = activeFilter.some(
      (filter) => !priceFilters.includes(filter)
    );

    return products.filter((item) => {
      const matchesPrice = activeFilter.some((filter) => {
        switch (filter) {
          case "0-100":
            return item.price >= 0 && item.price <= 100;
          case "101-250":
            return item.price >= 101 && item.price <= 250;
          case "250+":
            return item.price > 250;
          default:
            return false;
        }
      });

      const matchesProductType = activeFilter.includes(item.productType);

      if (hasPriceFilter && hasProductTypeFilter) {
        return matchesPrice && matchesProductType;
      }

      return matchesPrice || matchesProductType;
    });
  }, [activeFilter, products]);

  const renderProductsList = (productsArr: IProduct[]) => {
    if (productsArr.length === 0) {
      return <span className="noItems">There are no items available...</span>;
    }

    return productsArr.map(({ title, image, price, id }) => (
      <ProductItem title={title} image={image} price={price} id={id} key={id} />
    ));
  };

  const productsList = renderProductsList(filteredProducts);

  return (
    <div className="productsList">
      {productsLoadingStatus === "loading" ? (
        <Spinner />
      ) : (
        <motion.div
          className="productsList__grid"
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {productsList}
        </motion.div>
      )}
      <div className="productsList__button">Load more</div>
    </div>
  );
};

export default ProductsList;
