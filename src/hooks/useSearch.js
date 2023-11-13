import { useState, useMemo, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFruitList,
  setSelectedFruit,
} from "../utils/storeSlices/fruitsSlice";
import useFruitList from "../hooks/useFruitList";
import createThrottler from "../utils/throttleUtils";
import { useLocation, useNavigate } from "react-router-dom";
import useClickOutside from "../hooks/useClickOutside";

const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useFruitList();
  const reduxFruits = useSelector(selectFruitList);
  const location = useLocation();
  const searchContainerRef = useRef(null);

  const hideSearchResults = useCallback(() => {
    setShowSearchResults(false);
  }, []);

  useClickOutside(searchContainerRef, hideSearchResults);

  const fruits = useMemo(() => [...reduxFruits], [reduxFruits]);

  const throttledHandleSearch = createThrottler((value) => {
    setSearchTerm(value);
    setShowSearchResults(value.length >= 2);
  });

  const throttledHandleSearchResultClick = createThrottler((selectedFruit) => {
    try {
      dispatch(setSelectedFruit(selectedFruit));
      setSearchTerm("");
      setShowSearchResults(false);
    } catch (error) {
      setError(error.message);
    }
  });

  const handleSearch = useCallback(
    (event) => {
      throttledHandleSearch(event.target.value);
    },
    [throttledHandleSearch]
  );

  const handleSearchResultClick = useCallback(
    (selectedFruit) => {
      throttledHandleSearchResultClick(selectedFruit);

      const isOnUpdatePage = location.pathname.startsWith("/update");

      if (!isOnUpdatePage) {
        navigate(`/fruit/${selectedFruit.name}`);
      }
    },
    [throttledHandleSearchResultClick, navigate, location]
  );

  const filteredFruits = useMemo(() => {
    try {
      return fruits.filter((fruit) =>
        fruit.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } catch (error) {
      setError(error.message);
      return [];
    }
  }, [fruits, searchTerm]);

  const displayedFruits = useMemo(
    () => filteredFruits.slice(0, 3),
    [filteredFruits]
  );

  return {
    searchTerm,
    handleSearch,
    handleSearchResultClick,
    displayedFruits,
    showSearchResults,
    isLoading,
    error,
    hideSearchResults,
    searchContainerRef,
  };
};

export default useSearch;
