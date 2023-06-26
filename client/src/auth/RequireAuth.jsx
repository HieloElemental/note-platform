import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children, allowedRoles }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.userTypeName)) {
    return <Navigate to="/unauthorised" replace />;
  }

  return children;
};
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RequireAuth;
