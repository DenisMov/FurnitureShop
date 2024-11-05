import { auth, googleAuthProvider } from "./firebase";
import { signInWithPopup, User } from "firebase/auth";
import { FC } from "react";

interface AuthProviderProps {
  onLogin: (user: User) => void;
}

export const AuthProvider: FC<AuthProviderProps> = ({ onLogin }) => {
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: user.uid,
            username: user.displayName,
            email: user.email,
          })
        );
        onLogin(user);
      })
      .catch((error) => console.error("Google login error:", error));
  };

  return (
    <button onClick={handleGoogleLogin} className="auth__button google-login">
      Login with Google
    </button>
  );
};
