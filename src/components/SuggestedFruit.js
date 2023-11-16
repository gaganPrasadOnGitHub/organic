import React, { useMemo } from "react";
import DisplayCard from "./DisplayCard";
import { useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";

const SuggestedFruits = ({ fruits, selectedFruitName }) => {
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

  const randomIndexes = useMemo(() => {
    if (!fruits || fruits.length === 0) {
      return [];
    }

    const filteredFruits = fruits.filter(
      (f) => f.name.toLowerCase() !== selectedFruitName.toLowerCase()
    );
    return getRandomIndexes(filteredFruits.length, 2);
  }, [fruits, selectedFruitName]);

  return (
    <div>
      <p className="title secondary_title">
        {translations[selectedLanguage].SuggestedFruits}
      </p>
      <div className="suggestion__container">
        {randomIndexes.map((index) => (
          <DisplayCard
            key={index}
            className="suggestion_card"
            fruit={fruits[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default SuggestedFruits;
