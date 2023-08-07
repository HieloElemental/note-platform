import { createContext, useState } from "react";
import useUser from "../hooks/useUser";
import useError from "../hooks/useError";
import PropTypes from "prop-types";
import authProvider from "../utils/authProvider";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const user = useUser();
  const usedError = useError();
  const [authUser, setAuthUser] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    const accessToken = localStorage.getItem("accessToken");
    storedUserData && user.getUserData(accessToken);
    return storedUserData
      ? { ...JSON.parse(storedUserData), accessToken }
      : null;
  });

  const signIn = async (signInParams) => {
    try {
      const { accessToken, newUser } = await authProvider.signIn(signInParams);
      user.getUserData(accessToken);
      setAuthUser({ ...newUser, accessToken });
      return true;
    } catch (err) {
      usedError.showError(err);
      return false;
    }
  };

  const signOut = async () => {
    await authProvider.signOut();
    user.removeUser();
    setAuthUser(null);
  };

  const value = { authUser, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
