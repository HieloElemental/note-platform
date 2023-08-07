import { createContext, useState } from "react";
import { PropTypes } from "prop-types";

const ErrorContext = createContext(null);

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const showError = ({ message = "Hubo un error", title = "Ops!" }) => {
    setError({ message, title });
  };

  const clearError = () => {
    setError("");
  };

  const value = { error, showError, clearError };
  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};
ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ErrorProvider, ErrorContext };
