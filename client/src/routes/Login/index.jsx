import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./index.css";
import ErrorAlert from "./../../components/ErrorAlert/index";
import GeneralForm from "../../components/GeneralForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const loginFields = [
    { type: "text", name: "username", label: "Usuario", required: true },
    { type: "password", name: "password", label: "Contraseña", required: true },
  ];

  const handleSubmit = async (formData) => {
    try {
      const { username, password } = formData;
      await auth.signIn({ username, password });
      navigate(location.state?.from || "/");
    } catch (err) {
      return;
    }
  };

  return (
    <div className="Login">
      <div className="login-box">
        <ErrorAlert type="ErrorBox" />
        <GeneralForm
          fields={loginFields}
          onSubmit={handleSubmit}
          btn={{ type: "neon" }}
        >
          <h2>Ingresar</h2>
        </GeneralForm>
      </div>
    </div>
  );
};

export default Login;
