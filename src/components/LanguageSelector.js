import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../utils/storeSlices/languageSlice";
import languageIcon from "../assets/languageIcon.svg";
import useClickOutside from "../hooks/useClickOutside";

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "zh", name: "中文" },
  { code: "hi", name: "हिन्दी" },
  { code: "ar", name: "العربية" },
  { code: "ja", name: "日本語" },
  { code: "ru", name: "Русский" },
  { code: "pt", name: "Português" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
];

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector((state) => state.language);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const languageOptionsRef = useRef(null);

  const handleLanguageChange = (newLanguage) => {
    dispatch(setLanguage(newLanguage));
    setIsOptionsVisible(false);
  };

  const toggleOptionsVisibility = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  const isLanguageActive = (languageCode) => selectedLanguage === languageCode;

  useClickOutside(languageOptionsRef, () => {
    setIsOptionsVisible(false);
  });

  return (
    <div className="language_selector" ref={languageOptionsRef}>
      <img
        onClick={toggleOptionsVisibility}
        className={`icon language_icon ${isOptionsVisible ? "active" : ""}`}
        src={languageIcon}
        alt="language"
      />
      {isOptionsVisible && (
        <div className="filter_options language_options blur">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              className={isLanguageActive(language.code) ? "active" : ""}
            >
              {language.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
