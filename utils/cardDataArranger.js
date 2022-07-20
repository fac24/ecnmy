// Sorts an array by Time (In our case year, but the first four characters is the year)
// Then slices giving values back based on what a user wants (in our case splits of 35 as that is the number of data points we have)
const sortByYearReturningOneYear = (arr, slice) => {
  return arr
    .sort((a, b) => {
      return (
        parseInt(b.Time.substring(0, 4)) - parseInt(a.Time.substring(0, 4))
      );
    })
    .slice(slice[0], slice[1]);
};

// Gets all the data by the object property Geography
export const getDataByGeography = (arr, Geography) => {
  return arr[arr.findIndex((item) => item.Geography === Geography)];
};

// Find the percentage change based on a previous years values
const findChange = (current, previous, Geography) => {
  const currentValue = getDataByGeography(current, Geography).Value;
  const previousValue = getDataByGeography(previous, Geography).Value;
  return ((currentValue - previousValue) / previousValue) * 100;
};

export default function cardDataArranger(arr, location) {
  return arr.map((dataset) => {
    //Gives us the array of data in the dataset
    const dataArray = dataset.data.data;

    // Inits variables for the card object we're building
    const allCurrentYearData = sortByYearReturningOneYear(dataArray, [0, 35]);
    const lastYearsData = sortByYearReturningOneYear(dataArray, [35, 70]);
    const boroughCurrentYearData = allCurrentYearData
      .filter((data) => {
        return data.Geography === "United Kingdom" ||
          data.Geography === "London"
          ? false
          : true;
      })
      .sort((a, b) => b.Value - a.Value);

    const locationData = getDataByGeography(allCurrentYearData, location);
    const ukData = getDataByGeography(
      allCurrentYearData,
      "United Kingdom"
    ).Value;
    const londonData = getDataByGeography(allCurrentYearData, "London").Value;
    const ranking =
      boroughCurrentYearData.findIndex((item) => item.Geography === location) +
      1; // +1 as 0 indexed
    const change = findChange(allCurrentYearData, lastYearsData, location);

    return {
      cardData: { locationData, ukData, londonData, ranking, change },
      indicator: dataset.indicator,
    };
  });
}
