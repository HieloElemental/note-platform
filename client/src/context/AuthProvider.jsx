import { createContext, useState } from "react";
import PropTypes from "prop-types";
import authProvider from "../utils/authProvider";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem("userData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  const signIn = async (userData) => {
    const { token, newUser } = await authProvider.signIn(userData);
    setUser({ ...newUser, token });
  };

  const signOut = async () => {
    await authProvider.signOut();
    setUser(null);
  };

  const value = { user, signIn, signOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, AuthContext };
