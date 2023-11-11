import { PropTypes } from "prop-types";

import "./index.css";
import { useState } from "react";

const FullScreenCard = ({ children, closeAction }) => {
  const [fading, setFading] = useState(false);
  const closeHandler = () => {
    setFading(true);
    setTimeout(closeAction, 1000);
  };

  return (
    <div className={`FullScreenCard ${fading ? "slideOut" : "slideIn"}`}>
      <button className='close-button' onClick={() => closeHandler()}>
        x
      </button>
      {children}
    </div>
  );
};
FullScreenCard.propTypes = {
  children: PropTypes.node,
  closeAction: PropTypes.func,
};

export default FullScreenCard;
