export const validateData = (dataState, imgState, objLength) => {
  let dataArray = Object.entries(dataState);
  let filteredData = dataArray.filter(([key, value]) => value);
  let filteredObj = Object.fromEntries(filteredData);
  let filteredObjKeys = Object.keys(filteredObj);
  if (filteredObjKeys.length === objLength && imgState) {
    return true;
  } else {
    return false;
  }
};
