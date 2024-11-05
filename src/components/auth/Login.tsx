import { useForm } from "react-hook-form";
import "./auth.scss";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { AuthProvider } from "../../auth";
import { User } from "firebase/auth";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError(null);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      if (data.username === "testuser" && data.password === "password123") {
        const user = { id: "123", username: data.username };
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        setError("Invalid username or password.");
      }
    } catch (e) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = (user: User) => {
    const loggedUser = {
      id: user.uid,
      username: user.displayName,
      email: user.email,
    };
    localStorage.setItem("user", JSON.stringify(loggedUser));
    navigate("/home");
    window.location.reload();
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
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="auth__button"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        {error && <div className="error">{error}</div>}
      </form>
      <AuthProvider onLogin={handleGoogleLogin} />
    </div>
  );
};

export default Login;
