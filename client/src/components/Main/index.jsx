import { PropTypes } from "prop-types";
import "./index.css";

const Main = ({ children }) => {
  return <main>{children}</main>;
};
Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
