import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFruitList } from "../utils/storeSlices/fruitsSlice";
import firestoreFunctions from "../utils/firebase/firestore";

const useFruitList = () => {
  const dispatch = useDispatch();
  const [fruits, setFruits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fruitList = await firestoreFunctions.fetchAllFruits();

        if (fruitList.length === 0) {
          setIsLoading(false);
          return;
        }

        dispatch(setFruitList(fruitList));
        setFruits(fruitList);
        setIsLoading(false);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return { fruits, isLoading, error };
};

export default useFruitList;
