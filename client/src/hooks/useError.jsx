import { useContext } from "react";
import { ErrorContext } from "../context/ErrorProvider";

const useError = () => {
  const error = useContext(ErrorContext);
  return error;
};

export default useError;
