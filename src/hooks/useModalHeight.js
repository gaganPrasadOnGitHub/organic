import { useState, useEffect, useCallback } from "react";
export const useModalHeight = (
  smallHeight = 150,
  largeHeight = 165,
  thresholdWidth = 768
) => {
  const calculateModalHeight = useCallback(() => {
    if (window.innerWidth >= thresholdWidth) {
      return window.innerHeight - largeHeight;
    } else {
      return window.innerHeight - smallHeight;
    }
  }, [smallHeight, largeHeight, thresholdWidth]);

  const [modalHeight, setModalHeight] = useState(calculateModalHeight);

  useEffect(() => {
    const handleResize = () => {
      setModalHeight(calculateModalHeight());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateModalHeight]);

  return modalHeight;
};
