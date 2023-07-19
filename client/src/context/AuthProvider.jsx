import { createContext, useState } from "react";
import useUser from "../hooks/useUser";
import PropTypes from "prop-types";
import authProvider from "../utils/authProvider";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const userData = useUser();
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData
      ? { ...JSON.parse(storedUserData), token: localStorage.getItem("token") }
      : null;
  });

  const signIn = async (signInParams) => {
    const { token, newUser } = await authProvider.signIn(signInParams);
    userData.setUserData(token);
    setUser({ ...newUser, token });
  };

  const signOut = async () => {
    await authProvider.signOut();
    userData.removeUser();
    setUser(null);
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
