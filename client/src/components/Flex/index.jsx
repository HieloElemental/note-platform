import "./index.css";
import { PropTypes } from "prop-types";

const Flex = ({ children, style }) => {
  return (
    <div className='Flex' style={style}>
      {children}
    </div>
  );
};
Flex.propTypes = {
  children: PropTypes.node,
  style: PropTypes.any,
};

export default Flex;
