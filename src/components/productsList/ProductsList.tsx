import { useEffect, useState } from "react";
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
import { visitParameterList } from "typescript";

const ProductsList = () => {
  const { products, productsLoadingStatus, activeFilter } = useTypedSelector(
    (state) => state.products
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (productsLoadingStatus === "loading") {
    return <Spinner />;
  }

  const filteredProducts =
    activeFilter.length === 0
      ? products
      : products.filter((item) => {
          const priceFilter = ["0-100", "101-250", "250+"];

          const checkActivePriceFilter = activeFilter.some((filter) =>
            priceFilter.includes(filter)
          );
          const checkActiveProductType = activeFilter.some(
            (filter) => !priceFilter.includes(filter)
          );

          const variantPrice = activeFilter.some((filter) => {
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

          const variantProductType = activeFilter.includes(item.productType);

          if (checkActivePriceFilter && checkActiveProductType) {
            return variantProductType && variantPrice;
          }

          return variantPrice || variantProductType;
        });

  const renderProductsList = (productsArr: IProduct[]) => {
    if (productsArr.length === 0) {
      return <span className="noItems">There is no items yet...</span>;
    }

    return productsArr.map(({ title, image, price, id }) => {
      return (
        <ProductItem
          title={title}
          image={image}
          price={price}
          id={id}
          key={id}
        />
      );
    });
  };

  const productsList = renderProductsList(filteredProducts);

  return (
    <div className="productsList">
      <motion.div
        className="productsList__grid"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        {productsList}
      </motion.div>
      <div className="productsList__button">Load more</div>
    </div>
  );
};

export default ProductsList;
