import { useForm } from "react-hook-form";
import "./auth.scss";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { clearError, loginUser } from "../../slices/userSlice";
import { useEffect } from "react";

interface formData {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isLoading } = useTypedSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data: any) => {
    //@ts-ignore
    dispatch(loginUser(data));
  };

  return (
    <div className="auth">
      <div className="auth__title">Login</div>
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
            type="password"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <div className="error">Required</div>}
        </div>
        <button type="submit" disabled={isSubmitting} className="auth__button">
          {isLoading ? "Loading..." : "Login"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
