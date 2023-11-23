import { useEffect } from "react";

const useEscKey = (callback) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [callback]);
};

export default useEscKey;
