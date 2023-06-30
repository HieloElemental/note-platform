import PropTypes from "prop-types";
import "./index.css";

const ErrorAlert = ({ error, errTitle, onClose }) => {
  return (
    <div className="ErrorBox">
      <button onClick={onClose}>&times;</button>
      <strong>Ops!</strong>
      <br />
      {error}
    </div>
  );
};
ErrorAlert.propTypes = {
  error: PropTypes.string,
  errTitle: PropTypes.string,
  onClose: PropTypes.func,
};

export default ErrorAlert;
