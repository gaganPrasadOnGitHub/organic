import React, { useEffect, useState } from "react";
import DisplayCard from "./DisplayCard";
import useFruitList from "../hooks/useFruitList";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFilteredList,
  selectSelectedSortOption,
  setFilteredList,
  setSelectedSortOption,
} from "../utils/storeSlices/fruitsSlice";
import SortFilter from "./SortFilter";
import SeasonFilter from "./SeasonFilter";
import Pagination from "./Pagination";

const DisplayFruitList = () => {
  const { fruits, isLoading } = useFruitList();
  const filteredFruitList = useSelector(selectFilteredList);
  const selectedSortOption = useSelector(selectSelectedSortOption);
  const dispatch = useDispatch();

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredFruitList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFruitList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    const sortedFruits = [...fruits].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    dispatch(setSelectedSortOption("name"));
    dispatch(setFilteredList(sortedFruits));
  }, [dispatch, fruits]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading || !fruits.length) {
    return (
      <div className="loading">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <div className="filter__container">
        <SeasonFilter paginate={paginate} />
        <SortFilter />
      </div>
      <div className="container_shadow card_list_container_height">
        <div className="card_list__container">
          {currentItems.map((fruit) => (
            <DisplayCard
              className="primary_card"
              key={fruit.id}
              fruit={fruit}
              selectedSortOption={selectedSortOption}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            paginate={paginate}
          />
        )}
      </div>
    </>
  );
};

export default DisplayFruitList;
