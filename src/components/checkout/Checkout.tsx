import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import * as yup from "yup";

import Portal from "../portal/portal";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useHttp } from "../../hooks/http.hook";
import { setOrderStatus } from "../../slices/cartSlice";
import { CartNotifyModal } from "../cartNotifyModal/CartNotifyModal";

import "./checkout.scss";

const requiredString = (msg: string) => {
  return yup.string().min(2, msg).required();
};

const apiUrl = process.env.REACT_APP_API_BASE_URL;

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  firstName: requiredString("From two characters or more"),
  lastName: requiredString("From two characters or more"),
  address: requiredString("From two characters or more"),
  city: requiredString("From two characters or more"),
  postalCode: yup
    .number()
    .typeError("Postal code must be a number")
    .required("Postal code is required"),
});

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: number;
}

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { cartTotal, cartProducts, orderStatus } = useTypedSelector(
    (state) => state.cart
  );
  const { user } = useTypedSelector((state) => state.user);
  const { request } = useHttp();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data: FormData, e: any) => {
    e.preventDefault();
    const orderData = {
      userId: user?.id,
      date: new Date(),
      ...data,
      cartProducts,
      cartTotal,
    };

    await request({
      url: `${apiUrl}/orders`,
      method: "POST",
      body: orderData,
    })
      .then(() => {
        navigate("/");
        dispatch(setOrderStatus("success"));
      })
      .catch(() => {
        dispatch(setOrderStatus("error"));
      })
      .finally(() => {
        setTimeout(() => {
          dispatch(setOrderStatus("idle"));
        }, 3000);
      });
  };

  return (
    <div className="checkout">
      {orderStatus === "error" && (
        <Portal>
          <CartNotifyModal>
            <p>Error!</p>
          </CartNotifyModal>
        </Portal>
      )}
      <div className="checkout__title">Checkout</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <div className="error">{errors.email.message}</div>}

          <input
            type="text"
            placeholder="First name"
            {...register("firstName", { required: "First name is required" })}
          />
          {errors.firstName && (
            <div className="error">{errors.firstName.message}</div>
          )}

          <input
            type="text"
            placeholder="Last name"
            {...register("lastName", { required: "Last name is required" })}
          />
          {errors.lastName && (
            <div className="error">{errors.lastName.message}</div>
          )}

          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <div className="error">{errors.address.message}</div>
          )}

          <input
            type="text"
            placeholder="City"
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <div className="error">{errors.city.message}</div>}

          <input
            type="text"
            placeholder="Postal code"
            {...register("postalCode", { required: "Postal code is required" })}
          />
          {errors.postalCode && (
            <div className="error">{errors.postalCode.message}</div>
          )}
        </div>

        <div className="checkout__confirm">
          <div className="checkout__total">Total: £{cartTotal}</div>
          <button
            type="submit"
            className={
              isValid
                ? "checkout__button"
                : "checkout__button checkout__button-disable"
            }
            disabled={!isValid}
          >
            Confirm Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
