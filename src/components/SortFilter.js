import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";
import {
  selectFilteredList,
  selectFruitList,
  selectSelectedSortOption,
  setFruitAndFilterList,
  setSelectedSortOption,
} from "../utils/storeSlices/fruitsSlice";
import sortIcon from "../assets/sortIcon.svg";
import { sortFruitsBySelectedOption } from "../utils/helpers/filterHelpers";
import useClickOutside from "../hooks/useClickOutside";

const SortFilter = () => {
  const selectedLanguage = useSelector((state) => state.language);
  const sortOptions = [
    "name",
    "fat",
    "sugar",
    "protein",
    "calories",
    "carbohydrates",
  ];
  const activeSortOption = useSelector(selectSelectedSortOption);
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const dispatch = useDispatch();
  const optionsContainerRef = useRef(null);
  const originalFruitList = useSelector(selectFruitList);
  const filteredFruitList = useSelector(selectFilteredList);

  const handleSortOptionClick = (option) => {
    dispatch(setSelectedSortOption(option));

    const sortedFruits = sortFruitsBySelectedOption(filteredFruitList, option);

    dispatch(
      setFruitAndFilterList({
        list: originalFruitList,
        filteredList: sortedFruits,
      })
    );
    setIsOptionsVisible(false);
  };

  const handleSortIconClick = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  useClickOutside(optionsContainerRef, () => {
    setIsOptionsVisible(false);
  });

  return (
    <div className="sorting__container" ref={optionsContainerRef}>
      <div className="sorting_icon" onClick={handleSortIconClick}>
        <img src={sortIcon} alt="sort" />
      </div>
      {isOptionsVisible && (
        <div className="filter_options sorting_options blur">
          {sortOptions.map((option) => (
            <button
              key={option}
              className={`sorting_option ${
                activeSortOption === option ? "active" : ""
              }`}
              onClick={() => handleSortOptionClick(option)}
            >
              {translations[selectedLanguage][option]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortFilter;
