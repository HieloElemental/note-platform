import { PropTypes } from "prop-types";
import { useEffect, useRef, useState, useCallback } from "react";
import "./index.css";

const SquareImg = ({ src, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const aspectRatioRef = useRef(null);

  const resizeForSquareAppearance = useCallback(() => {
    aspectRatioRef.current.style.height = `${aspectRatioRef.current.clientWidth}px`;
    if (imageLoaded) {
      aspectRatioRef.current.style.height = `${aspectRatioRef.current.clientWidth}px`;
    }
  }, [imageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    resizeForSquareAppearance();
    window.addEventListener("resize", resizeForSquareAppearance);
    return () => {
      window.removeEventListener("resize", resizeForSquareAppearance);
    };
  }, [resizeForSquareAppearance]);

  return (
    <>
      <img
        className="ratio-1-1"
        src={src}
        alt={alt}
        ref={aspectRatioRef}
        onLoad={handleImageLoad}
      />
    </>
  );
};
SquareImg.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default SquareImg;
