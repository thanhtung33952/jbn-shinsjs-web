import L from "leaflet";
export const getPostion = (lat, lng) => {
  if (!lat || !lng) {
    return null;
  }

  const latNum = convertFloat(lat);
  const lngNum = convertFloat(lng);

  if (latNum === 0 || lngNum === 0) {
    return null;
  }

  return [latNum, lngNum];
};
export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};
export const getLatLng = (lat, lng) => {
  try {
    return L.latLng(lat, lng);
  } catch (error) {
    return null;
  }
};

export const convertFloat = val => {
  try {
    return parseFloat(val);
  } catch (error) {
    return 0;
  }
};
