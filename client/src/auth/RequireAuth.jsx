import { useLocation, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import useAuth from "../hooks/useAuth";

const RequireAuth = ({ children, allowedRoles, redirect }) => {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.authUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.authUser.userTypeName)) {
    if (redirect) return <Navigate to="/unauthorised" replace />;
    return <></>;
  }

  return children;
};
RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string),
  redirect: PropTypes.bool,
};

export default RequireAuth;
