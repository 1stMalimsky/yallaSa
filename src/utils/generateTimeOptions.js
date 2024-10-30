const generateTimeOptions = (start = 8, end = 20) => {
  const timeOptions = [];
  for (let hour = start; hour <= end; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    timeOptions.push(time);
  }
  return timeOptions;
};

export default generateTimeOptions;
