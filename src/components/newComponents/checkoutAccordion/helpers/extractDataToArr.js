const extractDataToArr = (rawData) => {
  const arr = [];
  for (const [name, details] of Object.entries(rawData)) {
    arr.push({
      name,
      ...details,
    });
  }
  return arr;
};

export default extractDataToArr;
