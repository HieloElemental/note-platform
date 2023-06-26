import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./index.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get("username");
    const password = formData.get("password");

    console.log(username, password);

    await auth.signIn({ username, password });
    navigate(location.state?.from || "/");
  };

  return (
    <div className="Login">
      <div className="login-box">
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
