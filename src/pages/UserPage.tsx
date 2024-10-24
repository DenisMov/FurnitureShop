import { useEffect } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { fetchUserOrders } from "../slices/userSlice";
import "./account.scss";
import { Link } from "react-router-dom";

const UserPage = () => {
  const { user, orders, ordersIsLoading, ordersError } = useTypedSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchUserOrders());
  }, []);

  const ordersRender = () => {
    return (
      <>
        {orders.map((order: any, i: any) => (
          <div className="order">
            <div className="order__title">Order #{i + 1}</div>
            <div className="order__info">
              <div>Title</div>
              <div>Quantity</div>
              <div>Total</div>
            </div>
            {order.cartProducts.map((item: any) => {
              return (
                <div className="order__item">
                  <div>{item.title}</div>
                  <div>{item.quantity}</div>
                  <div>£{item.quantity * item.price}</div>
                </div>
              );
            })}
            <div className="order__total">Order Total: £{order.cartTotal}</div>
          </div>
        ))}
      </>
    );
  };

  return (
    <div className="account">
      <div className="account__container">
        <div className="account__username">Your username: {user?.username}</div>
        <div className="account__orders">
          <div className="account__history">Orders History</div>
          {orders.length ? (
            ordersRender()
          ) : (
            <>
              <div className="account__noOrders">
                "You have not placed any order yet"
              </div>
              <Link to="/products">
                <button className="empty__button">Go shopping</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
