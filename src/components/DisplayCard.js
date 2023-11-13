import React from "react";
import apple from "../assets/apple.png";
import { Link } from "react-router-dom";
import { isValidUrl } from "../utils/validation";
import { useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";

const DisplayCard = ({ fruit, className, isSearchResult, onClick }) => {
  const { name, imageUrl } = fruit;
  const selectedLanguage = useSelector((state) => state.language);

  const cardContent = (
    <div className={`card ${className || ""}`} onClick={onClick}>
      <div className="card_image__wrapper">
        <img src={isValidUrl(imageUrl) ? imageUrl : apple} alt="fruit" />
      </div>
      <div className="card_info__wrapper">
        <p className="card_title">
          {name || translations[selectedLanguage].fruitName}
        </p>
      </div>
    </div>
  );

  if (name && !isSearchResult) {
    return <Link to={`/fruit/${name}`}>{cardContent}</Link>;
  }

  return cardContent;
};

export default DisplayCard;
