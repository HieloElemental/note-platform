import { PropTypes } from "prop-types";

const Arrow = ({ className }) => {
  return (
    <svg
      className={className}
      height="48"
      viewBox="0 0 48 48"
      width="48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="currentColor"
        d="M14.83 16.42l9.17 9.17 9.17-9.17 2.83 2.83-12 12-12-12z"
      />
      <path d="M0-.75h48v48h-48z" fill="none" />
    </svg>
  );
};
Arrow.propTypes = {
  className: PropTypes.string,
};

export default Arrow;
