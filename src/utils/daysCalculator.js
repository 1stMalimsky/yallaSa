import dayjs from "dayjs";

const daysCalculator = (pickupDate, dropoffDate) => {
  const pickup = dayjs(pickupDate);
  const dropoff = dayjs(dropoffDate);

  const differenceInDays = dropoff.diff(pickup, "day");

  return differenceInDays;
};

export default daysCalculator;
