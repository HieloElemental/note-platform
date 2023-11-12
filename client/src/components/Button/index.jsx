import { PropTypes } from "prop-types";

import "./index.css";

const Button = ({ onClick, type, children }) => {
  return (
    <div className={`Button Button-${type}`} onClick={() => onClick()}>
      {children}
    </div>
  );
};
Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
