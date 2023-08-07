import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";

import "./index.css";

const Login = () => {
  const auth = useAuth();
  const usedError = useError();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData(event.currentTarget);
      const userPassword = formData.get("password");

      const sign = await auth.signIn({
        userUsername: auth.authUser.userUsername,
        userPassword,
      });
      sign && usedError.clearError();
    } catch (err) {
      return;
    }
  };

  return (
    <div className="Recover">
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="user-box">
          <input type="password" name="password" required />
          <label>Contraseña</label>
        </div>
        <button className="login-btn">Recuperar</button>
      </form>
    </div>
  );
};

export default Login;
