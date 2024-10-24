import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Footer from "../footer/Footer";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import ProductListingsPage from "../../pages/ProductListingsPage";
import CartPage from "../../pages/CartPage";
import ProductPage from "../../pages/ProductPage";
import MainPage from "../../pages/MainPage";
import Register from "../auth/Register";
import Login from "../auth/Login";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import UserPage from "../../pages/UserPage";
import CheckoutPage from "../../pages/CheckoutPage";

const App = () => {
  const { isAuth } = useTypedSelector((state) => state.user);
  const { cartProducts } = useTypedSelector((state) => state.cart);
  return (
    <Router>
      <div className="container">
        <Header />
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="products" element={<ProductListingsPage />} />
          <Route path="products/:id" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
          {cartProducts.length ? (
            <Route path="checkout" element={<CheckoutPage />} />
          ) : null}
          {!isAuth ? (
            <>
              <Route path="register" element={<Register />} />
              <Route path="login" element={<Login />} />
            </>
          ) : (
            <>
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
          {isAuth ? (
            <Route path="user" element={<UserPage />} />
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
