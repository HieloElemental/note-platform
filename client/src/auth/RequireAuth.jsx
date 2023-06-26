import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RequireAuth;
