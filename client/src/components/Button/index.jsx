import React from "react";
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
  onClick: PropTypes.function,
  type: PropTypes.string,
  children: PropTypes.ReactElement,
};

export default Button;
