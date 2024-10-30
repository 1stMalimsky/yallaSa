import daysCalculator from "../../../../utils/daysCalculator";

const calculateExtrasTotal = (inputState) => {
  const extrasArray = Object.values(inputState[5]);

  let grandTotal = 0;
  for (const extra of extrasArray) {
    grandTotal += extra.totalPrice;
  }
  return grandTotal;
};

const calculateTotalPrice = (rentalPricePerDay, panelData) => {
  let numOfDays = daysCalculator(
    panelData[0].pickupDate,
    panelData[0].dropoffDate
  );

  let totals = {
    totalRentalPrice: +numOfDays * rentalPricePerDay,
    totalInsurance: +numOfDays * 50,
    totalExtras: calculateExtrasTotal(panelData),
    totalCancellation: +numOfDays * 10,
  };

  let grandTotal = Object.values(totals).reduce((sum, value) => sum + value, 0);
  let grandTotals = { ...totals, grandTotal };
  //console.log("extra total", totals.totalExtras);

  //console.log("grandTotal", grandTotals);

  return grandTotals;
};

export { calculateExtrasTotal, calculateTotalPrice };
