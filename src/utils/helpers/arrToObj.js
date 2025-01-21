const arrToObj = (dataArr) => {
  const resultObject = {};
  dataArr.forEach((item, index) => {
    resultObject[`item${index}`] = item;
  });
  const dataToSend = JSON.stringify(resultObject);
  const payloadSize = new Blob([JSON.stringify(dataToSend)]).size; // Size in bytes
  console.log(`Payload size: ${payloadSize} bytes`);
  return dataToSend;
};

export default arrToObj;
