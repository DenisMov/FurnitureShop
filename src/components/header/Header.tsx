import { Link } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { logOut } from "../../slices/userSlice";

//@ts-ignore
import cart from "../../assets/icons/cart.svg";
import "./header.scss";
import { useDispatch } from "react-redux";

const Header = () => {
  const { cartProducts } = useTypedSelector((state) => state.cart);
  const { user, isAuth } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">Avion</div>
      </Link>

      <div className="header__regist">
        {isAuth ? (
          <>
            <Link to="/user">{user?.username}</Link>
            <Link to="/" onClick={handleLogOut}>
              Sign out
            </Link>
          </>
        ) : (
          <>
            <Link to="register">
              <div>Register</div>
            </Link>
            <Link to="login">
              <div>Sign in</div>
            </Link>
          </>
        )}

        <div className="header__cart">
          <Link to="cart">
            <img src={cart} alt="Cart shopping" />
            {cartProducts.length ? (
              <div className="header__counter">{cartProducts.length}</div>
            ) : null}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
