import { useForm } from "react-hook-form";
import "./auth.scss";

import { useDispatch } from "react-redux";
import { clearError, registerUser } from "../../slices/userSlice";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { error } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = (data: any) => {
    //@ts-ignore
    dispatch(registerUser({ id: uuidv4(), ...data }));
  };

  return (
    <div className="auth">
      <div className="auth__title">Register</div>
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth__input">
          <input
            type="text"
            placeholder="Username"
            {...register("username", { required: true })}
          />
          {errors.username && <div className="error">Required</div>}
        </div>

        <div className="auth__input">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <div className="error">Required</div>}
        </div>

        <div className="auth__input">
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <div className="error">Required</div>}
        </div>
        <button type="submit" disabled={isSubmitting} className="auth__button">
          Register
        </button>
        {error && (
          <div className="error">
            Someone already has that username. Try another?
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
