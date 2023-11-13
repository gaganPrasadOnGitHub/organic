import React, { useRef } from "react";
import useSearch from "../hooks/useSearch";
import { useSelector } from "react-redux";
import { translations } from "../utils/lang/translations";
import useClickOutside from "../hooks/useClickOutside";
import DisplayCard from "./DisplayCard";

const Search = () => {
  const {
    searchTerm,
    handleSearch,
    isLoading,
    showSearchResults,
    displayedFruits,
    hideSearchResults,
    handleSearchResultClick,
  } = useSearch();
  const selectedLanguage = useSelector((state) => state.language);

  const searchContainerRef = useRef(null);

  useClickOutside(searchContainerRef, hideSearchResults);

  return (
    <div className="search__container" ref={searchContainerRef}>
      <input
        type="text"
        placeholder={translations[selectedLanguage].searchForFruits}
        value={searchTerm}
        onChange={handleSearch}
        onClick={handleSearch}
        disabled={isLoading}
      />
      {showSearchResults && (
        <div className="search_result__container">
          {displayedFruits.map((fruit) => (
            <DisplayCard
              key={fruit?.id}
              fruit={fruit}
              className="search_card"
              isSearchResult={true}
              onClick={() => handleSearchResultClick(fruit)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(Search);
