import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
import userProvider from "../utils/userProvider";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserData = async (token) => {
    const givenUser = await userProvider.getUserData({ token });
    setUser(givenUser);
  };

  const removeUser = async () => {
    setUser(null);
  };

  const value = { user, removeUser, setUserData };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
