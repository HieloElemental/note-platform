import { Navigate } from "react-router-dom";

const Auth = ({ children, role }) => {
  if (localStorage.getItem("token")) {
    return <>{children}</>;
  }

  return <Navigate to="/" />;
};

export default Auth;
