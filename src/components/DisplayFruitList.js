// DisplayFruitList.js
import React, { useEffect } from "react";
import DisplayCard from "./DisplayCard";
import useFruitList from "../hooks/useFruitList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredList,
  setFilteredList,
  setSelectedSortOption,
} from "../utils/storeSlices/fruitsSlice";
import SortFilter from "./SortFilter";
import SeasonFilter from "./SeasonFilter";

const DisplayFruitList = () => {
  const { fruits, isLoading } = useFruitList();
  const filteredFruitList = useSelector(selectFilteredList);
  const dispatch = useDispatch();

  useEffect(() => {
    const sortedFruits = [...fruits].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    dispatch(setSelectedSortOption("name"));
    dispatch(setFilteredList(sortedFruits));
  }, [dispatch, fruits]);

  if (isLoading || !fruits.length) {
    return (
      <div className="loading">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="filter__container">
          <SeasonFilter />
          <SortFilter />
        </div>
        <div className="card_list__container">
          {filteredFruitList.map((fruit) => (
            <DisplayCard
              className="primary_card"
              key={fruit.id}
              fruit={fruit}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisplayFruitList;
