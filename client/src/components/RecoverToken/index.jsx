import useAuth from "../../hooks/useAuth";
import useError from "../../hooks/useError";

import "./index.css";
import GeneralForm from "./../GeneralForm/index";

const Login = () => {
  const auth = useAuth();
  const usedError = useError();

  const passwordRecoveryFields = [
    { type: "password", name: "password", required: true, label: "Contraseña" },
  ];

  const handleSubmit = async (formData) => {
    try {
      const { password } = formData;

      const sign = await auth.signIn({
        username: auth.authUser.username,
        password,
      });
      sign && usedError.clearError();
    } catch (err) {
      return;
    }
  };

  return (
    <div className="Recover">
      <GeneralForm
        fields={passwordRecoveryFields}
        onSubmit={handleSubmit}
        type="on-line"
      />
    </div>
  );
};

export default Login;
