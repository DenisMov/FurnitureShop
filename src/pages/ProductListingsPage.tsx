import Filters from "../components/filters/Filters";
import PageHeaders from "../components/pageHeaders/PageHeaders";
import ProductsList from "../components/productsList/ProductsList";

const ProductListingsPage = () => {
  return (
    <>
      <PageHeaders />
      <div style={{ display: "flex" }}>
        <Filters />
        <ProductsList />
      </div>
    </>
  );
};

export default ProductListingsPage;
