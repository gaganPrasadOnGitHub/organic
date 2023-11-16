import React, { useState, useEffect } from "react";

const ImageLoader = ({ src, alt, className }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  useEffect(() => {
    if (!src) {
      return;
    }

    const img = new Image();
    img.src = src;

    img.onload = handleImageLoad;
    img.onerror = () => {
      setImageLoaded(false);
    };
  }, [src]);

  return (
    <>
      {imageLoaded ? (
        <img
          className={className}
          src={src}
          alt={alt}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      ) : (
        <span className="loader"></span>
      )}
    </>
  );
};

export default ImageLoader;
