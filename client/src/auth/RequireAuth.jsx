import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children, allowedRoles, unauth }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.userTypeName)) {
    if (unauth) return <Navigate to="/unauthorised" replace />;
    return <></>;
  }

  return children;
};
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
  unauth: PropTypes.bool.isRequired,
};

export default RequireAuth;
