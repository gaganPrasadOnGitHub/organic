import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFruitList } from "../utils/storeSlices/fruitsSlice";
import { translations } from "../utils/lang/translations";
import ImageLoader from "./ImageLoader";
import SuggestedFruits from "./SuggestedFruit";

const DisplayFruit = () => {
  const { name } = useParams();
  const FruitList = useSelector(selectFruitList);
  const [fruit, setFruit] = useState();
  const selectedLanguage = useSelector((state) => state.language);

  useEffect(() => {
    if (!FruitList || FruitList.length === 0) {
      return;
    }

    const selectedFruit = FruitList?.find(
      (f) => f.name.toLowerCase() === name.toLowerCase()
    );
    setFruit(selectedFruit);
  }, [FruitList, name]);

  if (!FruitList || FruitList.length === 0 || !fruit) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="primary_container_height mobile_container_shadow">
      <div className="title__wrapper">
        <h2 className="title main_title">{fruit?.name}</h2>
        <div className="subtitle__wrapper">
          <p className="subtitle_with_label">
            <small>{translations[selectedLanguage].genus}</small>
            {fruit.genus}
          </p>
          <p className="subtitle_with_label">
            <small>{translations[selectedLanguage].family}</small>
            {fruit.family}
          </p>
          <p className="subtitle_with_label">
            <small>{translations[selectedLanguage].order}</small>
            {fruit.order}
          </p>
        </div>
      </div>
      <div className="product_detail__wrapper">
        <div>
          <p className="description__card">{fruit.description}</p>

          {FruitList && (
            <SuggestedFruits
              fruits={FruitList}
              selectedFruitName={fruit.name}
            />
          )}
        </div>

        <div className="product_image__wrapper">
          <ImageLoader
            src={fruit?.imageUrl}
            alt="main"
            className="product_image"
          />
          <p className="nutrition-item fat">
            {translations[selectedLanguage].fat} {fruit.nutrition.fat}
            {translations[selectedLanguage].gram}
          </p>
          <p className="nutrition-item sugar">
            {translations[selectedLanguage].sugar} {fruit.nutrition.sugar}
            {translations[selectedLanguage].gram}
          </p>
          <p className="nutrition-item protein">
            {translations[selectedLanguage].protein} {fruit.nutrition.protein}
            {translations[selectedLanguage].gram}
          </p>
          <p className="nutrition-item calories">
            {translations[selectedLanguage].calories} {fruit.nutrition.calories}
          </p>
          <p className="nutrition-item carbohydrates">
            {translations[selectedLanguage].carbohydrates}{" "}
            {fruit.nutrition.carbohydrates}
            {translations[selectedLanguage].gram}
          </p>
          <Link to="/fruits" className="explore_text">
            {translations[selectedLanguage].exploreMoreFruits}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DisplayFruit;
