import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import { isValidUrl } from "../utils/validation";
import { useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";
import ImageLoader from "./ImageLoader";

const DisplayCard = ({
  fruit,
  className,
  isSearchResult,
  onClick,
  selectedSortOption,
}) => {
  const { name, imageUrl } = fruit;
  const selectedLanguage = useSelector((state) => state.language);
  const nutritionMapping = {
    fat: translations[selectedLanguage].fat,
    sugar: translations[selectedLanguage].sugar,
    protein: translations[selectedLanguage].protein,
    calories: translations[selectedLanguage].calories,
    carbohydrates: translations[selectedLanguage].carbs,
  };

  const cardContent = (
    <div className={`card ${className || ""}`} onClick={onClick}>
      <div className="card_image__wrapper">
        <ImageLoader src={isValidUrl(imageUrl) ? imageUrl : logo} alt="fruit" />
      </div>

      <div className="card_info__wrapper">
        <p className="card_title">
          {name || translations[selectedLanguage].fruitName}
        </p>
        {Object.keys(nutritionMapping).map(
          (option) =>
            selectedSortOption === option && (
              <small
                className="nutrition_tag"
                key={option}
              >{`${nutritionMapping[option]}: ${fruit.nutrition[option]} g`}</small>
            )
        )}
      </div>
    </div>
  );

  if (name && !isSearchResult) {
    return (
      <Link className="card_link" to={`/fruit/${name}`}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
};

export default DisplayCard;
