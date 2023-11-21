import { useEffect } from "react";

const useNightMode = () => {
  useEffect(() => {
    const currentHour = new Date().getHours();
    const isNightTime = currentHour >= 18 || currentHour < 7;

    document.body.classList.toggle("dark-mode", isNightTime);
  }, []);
};

export default useNightMode;
