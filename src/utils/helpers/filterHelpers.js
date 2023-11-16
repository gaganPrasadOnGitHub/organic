// sort filter functions
export const getSortDataBySelectedOption = (fruit, option) => {
  if (option === "name") {
    return fruit.name.toLowerCase();
  } else if (option in fruit.nutrition) {
    return parseFloat(fruit.nutrition[option]);
  }
  return "0";
};

export const sortFruitsBySelectedOption = (fruits, option) => {
  return [...fruits].sort((a, b) => {
    const valueA = getSortDataBySelectedOption(a, option);
    const valueB = getSortDataBySelectedOption(b, option);
    return option === "name"
      ? valueA.localeCompare(valueB, undefined, { sensitivity: "base" })
      : valueA - valueB;
  });
};

// season filter functions
export const filterFruitsBySelectedSeason = (fruits, season) => {
  if (season === "all") {
    return [...fruits];
  }

  return fruits.filter((fruit) => fruit.season[season]);
};
