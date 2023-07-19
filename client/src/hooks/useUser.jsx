import { useContext } from "react";
import { UserContext } from "../context/UserProvider";

const useUser = () => {
  const user = useContext(UserContext);
  return user;
};

export default useUser;
