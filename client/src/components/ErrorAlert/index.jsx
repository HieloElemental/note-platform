import PropTypes from "prop-types";

const ErrorAlert = ({ error, errTitle, onClose }) => {
  return (
    <div className="ErrorBox">
      <h1>{errTitle}</h1>
      <p>{error}</p>
      <button onClick={onClose}>x</button>
    </div>
  );
};
ErrorAlert.propTypes = {
  error: PropTypes.string,
  errTitle: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorAlert;
