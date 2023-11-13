// SeasonFilter.js
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";
import {
  selectFruitList,
  selectSelectedSortOption,
  setFruitAndFilterList,
  setSelectedSeason,
} from "../utils/storeSlices/fruitsSlice";
import filterIcon from "../assets/filterIcon.svg";
import {
  filterFruitsBySelectedSeason,
  sortFruitsBySelectedOption,
} from "../utils/helpers/filterHelpers";
import useClickOutside from "../hooks/useClickOutside";

const SeasonFilter = () => {
  const selectedLanguage = useSelector((state) => state.language);
  const filters = ["all", "spring", "summer", "autumn", "winter"];
  const [activeFilter, setActiveFilter] = useState("all");
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);
  const dispatch = useDispatch();
  const optionsContainerRef = useRef(null);

  const originalFruitList = useSelector(selectFruitList);
  const selectedSort = useSelector(selectSelectedSortOption);

  const handleFilterOptionClick = (option) => {
    setActiveFilter(option);
    dispatch(setSelectedSeason(option));

    const filteredFruits = filterFruitsBySelectedSeason(
      originalFruitList,
      option
    );

    const sortedFruits = sortFruitsBySelectedOption(
      filteredFruits,
      selectedSort
    );

    dispatch(
      setFruitAndFilterList({
        list: originalFruitList,
        filteredList: sortedFruits,
      })
    );
    setIsOptionsVisible(false);
  };

  const handleFilterIconClick = () => {
    setIsOptionsVisible(!isOptionsVisible);
  };

  useClickOutside(optionsContainerRef, () => {
    setIsOptionsVisible(false);
  });

  return (
    <div className="season_filter" ref={optionsContainerRef}>
      <div className="icon filter_icon" onClick={handleFilterIconClick}>
        <img src={filterIcon} alt="filter" />
      </div>
      <div
        className={`filter_season_buttons_container ${
          isOptionsVisible ? "filter_options blur" : ""
        }`}
      >
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterOptionClick(filter)}
            className={activeFilter === filter ? "active" : ""}
          >
            {translations[selectedLanguage][filter]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SeasonFilter;
