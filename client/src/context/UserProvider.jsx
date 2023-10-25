import { createContext, useState } from "react";
import { PropTypes } from "prop-types";
import useError from "../hooks/useError";
import userProvider from "../utils/providers/userProvider";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const usedError = useError();

  const getUserData = async (token) => {
    try {
      const givenUser = await userProvider.getUserData({ token });
      setUserData(givenUser);
    } catch (err) {
      usedError.showError(err);
    }
  };

  const removeUser = async () => {
    setUserData(null);
  };

  const value = { userData, removeUser, getUserData };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { UserProvider, UserContext };
