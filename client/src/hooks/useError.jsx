import { useState } from "react";

const useError = () => {
  const [error, setError] = useState("");

  const showError = ({ message = "Hubo un error", title = "Ops!" }) => {
    setError({ message, title });
  };

  const clearError = () => {
    setError("");
  };

  return [error, showError, clearError];
};

export default useError;
