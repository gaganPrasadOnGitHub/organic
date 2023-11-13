import React from "react";
import reactIcon from "../assets/reactIcon.svg";
import { translations } from "../utils/lang/translations";
import { useSelector } from "react-redux";

const Footer = () => {
  const selectedLanguage = useSelector((state) => state.language);
  return (
    <div className="footer">
      <small className="footer_text">
        {translations[selectedLanguage].organic}{" "}
        <img className="react_icon" src={reactIcon} alt="react" /> 2023{" "}
        <a
          className="underline"
          href="https://www.linkedin.com/in/gagan-prasad/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {translations[selectedLanguage].dev}
        </a>
      </small>
    </div>
  );
};

export default Footer;
