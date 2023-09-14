import PropTypes from "prop-types";

import useError from "../../hooks/useError";

import RecoverToken from "../RecoverToken";

import "./index.css";

const ErrorAlert = ({ type }) => {
  const usedError = useError();
  return (
    <>
      {usedError?.error && (
        <div className={`Error ${type}`}>
          <button onClick={usedError.clearError}>&times;</button>
          <strong>Ops!</strong>
          <br />
          {useError.error?.title}
          <i>{usedError.error.message}</i>
          {(usedError.error.message === "su token ha expirado" ||
            (type === "ErrorAlert" &&
              usedError.error.message ===
                "Credenciales Invalidas! Contraseña Incorrecta") ||
            (type === "ErrorAlert" &&
              usedError.error.message ===
                "Campos Vacíos O Carácteres Inválidos En Algún Campo")) && (
            <>
              <br />
              <RecoverToken />
            </>
          )}
        </div>
      )}
    </>
  );
};
ErrorAlert.propTypes = {
  type: PropTypes.string,
};

export default ErrorAlert;
