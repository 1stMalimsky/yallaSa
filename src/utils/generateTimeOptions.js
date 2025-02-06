const generateTimeOptions = (start, end) => {
  //console.log("strat:", start, "end:", end);

  const startHour = parseInt(start.split(":")[0]);
  const endHour = parseInt(end.split(":")[0]);
  const timeOptions = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const time = `${hour.toString().padStart(2, "0")}:00`;
    timeOptions.push(time);
  }
  //console.log("timeOptions", timeOptions);

  return timeOptions;
};

export default generateTimeOptions;
