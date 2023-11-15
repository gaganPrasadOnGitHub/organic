import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFruitList } from "../utils/storeSlices/fruitsSlice";
import tree from "../assets/tree.png";
import DisplayCard from "./DisplayCard";
import { translations } from "../utils/lang/translations";

const DisplayFruit = () => {
  const { name } = useParams();
  const FruitList = useSelector(selectFruitList);
  const [fruit, setFruit] = useState();
  const selectedLanguage = useSelector((state) => state.language);

  const getRandomIndexes = (max, count) => {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  };

  const randomFruits = useMemo(() => {
    if (!FruitList || FruitList.length === 0 || !fruit) {
      return [];
    }

    const filteredFruits = FruitList.filter(
      (f) => f.name.toLowerCase() !== name.toLowerCase()
    );
    const randomIndexes = getRandomIndexes(filteredFruits.length, 2);
    return randomIndexes.map((index) => filteredFruits[index]);
  }, [FruitList, name, fruit]);

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
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="product__container mobile_container_shadow">
      <div className="title__wrapper">
        <h2 className="title">{fruit?.name}</h2>
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

          {randomFruits && (
            <div className="suggestion__container">
              <DisplayCard
                className="suggestion_card"
                fruit={randomFruits[0]}
              />
              <DisplayCard
                className="suggestion_card"
                fruit={randomFruits[1]}
              />
            </div>
          )}

          <Link to="/fruits">
            <button className="explore_button hover_underline_button">
              <span className="button_text">
                {translations[selectedLanguage].exploreMoreFruits}
              </span>
              <img className="button_image" src={tree} alt="tree" />
            </button>
          </Link>
        </div>

        <div className="product_image__wrapper">
          <img className="product_image" src={fruit.imageUrl} alt="main" />
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
        </div>
      </div>
    </div>
  );
};

export default DisplayFruit;
