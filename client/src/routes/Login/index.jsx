import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";

import "./index.css";
import ErrorAlert from "./../../components/ErrorAlert/index";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [error, showError, clearError] = useError();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userUsername = formData.get("username");
    const userPassword = formData.get("password");

    try {
      await auth.signIn({ userUsername, userPassword });
      navigate(location.state?.from || "/");
    } catch (error) {
      console.log(error);
      showError(error);
    }
  };

  return (
    <div className="Login">
      <div className="login-box">
        {error && (
          <ErrorAlert
            error={error.message}
            errTitle={error.title}
            onClose={clearError}
          />
        )}
        <form onSubmit={handleSubmit}>
          <h2>Ingresar a sigma</h2>
          <div className="user-box">
            <input type="text" name="username" required />
            <label>Usuario</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Contraseña</label>
          </div>
          <button className="login-btn">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
