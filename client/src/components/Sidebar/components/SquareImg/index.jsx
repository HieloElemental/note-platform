import { PropTypes } from "prop-types";
import { useEffect, useRef } from "react";
import "./index.css";

const SquareImg = ({ src, alt }) => {
  const aspectRatioRef = useRef(null);

  const resizeForSquareApperance = () => {
    if (aspectRatioRef.current) {
      aspectRatioRef.current.style.height = `${aspectRatioRef.current.clientWidth}px`;
    }
  };

  useEffect(() => {
    resizeForSquareApperance();
    window.addEventListener("resize", resizeForSquareApperance);
    return () => {
      window.addEventListener("resize", resizeForSquareApperance);
    };
  });
  return (
    <>
      <img className="ratio-1-1" src={src} alt={alt} ref={aspectRatioRef} />
    </>
  );
};
SquareImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default SquareImg;
