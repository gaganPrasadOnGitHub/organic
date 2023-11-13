import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addFruit,
  updateFruit,
  removeFruit,
  setSelectedFruit,
  selectSelectedFruit,
} from "../utils/storeSlices/fruitsSlice";
import {
  addFruitToFirestore,
  updateFruitInFirestore,
  deleteFruitFromFirestore,
  isFruitNameUnique,
} from "../utils/firebase/firestore";
import { initialFruitFormData } from "../utils/initialFruitFromData";
import { NUTRITION_NAMES, SEASON_NAMES } from "../utils/constant";
import { translations } from "../utils/lang/translations";

export const useFruitForm = () => {
  const dispatch = useDispatch();
  const selectedFruit = useSelector(selectSelectedFruit);
  const [formData, setFormData] = useState(
    selectedFruit || initialFruitFormData
  );
  const [errors, setErrors] = useState({});
  const [operationError, setOperationError] = useState(null);
  const selectedLanguage = useSelector((state) => state.language);

  useEffect(() => {
    setErrors({});
    setFormData(selectedFruit || initialFruitFormData);
    setOperationError(null);
  }, [selectedFruit]);

  const validateForm = () => {
    const newErrors = {};

    for (const key in formData) {
      if (formData[key] === "" || formData[key] === 0) {
        newErrors[
          key
        ] = `${translations[selectedLanguage][key]} ${translations[selectedLanguage].emptyError}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, type, checked, value } = e.target;
    let updatedValue = type === "checkbox" ? checked : value;

    if (type === "number" && !isNaN(parseFloat(value))) {
      updatedValue = parseFloat(value);
    }

    if (NUTRITION_NAMES.includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        nutrition: {
          ...prevData.nutrition,
          [name]: updatedValue,
        },
      }));
    } else if (SEASON_NAMES.includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        season: {
          ...prevData.season,
          [name]: checked,
        },
      }));
    } else {
      // Handle other non-nested properties
      setFormData((prevData) => ({
        ...prevData,
        [name]: updatedValue,
      }));
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    if (!validateForm()) {
      return;
    }
    const emptyFields = [];

    for (const key in formData) {
      if (formData[key] === "" || formData[key] === 0) {
        emptyFields.push(key);
      }
    }

    if (emptyFields.length > 0) {
      return;
    }

    try {
      if (selectedFruit) {
        dispatch(updateFruit({ id: selectedFruit.id, updatedFruit: formData }));
        await updateFruitInFirestore(selectedFruit.id, formData);
      } else {
        const isUniqueInFirestore = await isFruitNameUnique(formData?.name);

        if (isUniqueInFirestore) {
          const documentId = await addFruitToFirestore(formData);
          dispatch(addFruit({ id: documentId, ...formData }));
          dispatch(setSelectedFruit({ id: documentId, ...formData }));
        } else {
          setOperationError(translations[selectedLanguage].uniqueName);
        }
      }
    } catch (error) {
      setOperationError(
        `${translations[selectedLanguage].errorAddUpdate} ${error}`
      );
    }
  };

  const handleAddNewFruit = () => {
    dispatch(setSelectedFruit(null));
    setFormData(initialFruitFormData);
  };

  const handleDelete = async () => {
    try {
      if (!selectedFruit) {
        return;
      }
      dispatch(removeFruit(selectedFruit.id));
      await deleteFruitFromFirestore(selectedFruit.id);
    } catch (error) {
      setOperationError(
        `${translations[selectedLanguage].errorDelete} ${error}`
      );
    }
  };

  return {
    formData,
    errors,
    operationError,
    handleInputChange,
    handleSubmit,
    handleDelete,
    handleAddNewFruit,
  };
};

export default useFruitForm;
