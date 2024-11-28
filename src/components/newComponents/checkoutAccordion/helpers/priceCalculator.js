import caravanCatalog from "../../helpers/caravanCatalog.js";

const calculateExtrasTotal = (inputState) => {
  const extrasArray = Object.values(inputState[5]);

  let grandTotal = 0;
  for (const extra of extrasArray) {
    grandTotal += extra.totalPrice;
  }
  return grandTotal;
};

const calculateTotalPrice = async (panelData) => {
  const initData = panelData[0];
  const numOfDays = panelData[0].numOfDays;
  const insurnance = panelData[4];
  const cancelPolicy = panelData[6];
  //console.log("initData", initData);
  try {
    const currnetCaravan = caravanCatalog.find(
      (item) => item._id === +initData.id
    );
    //console.log("currentCaravan", currnetCaravan);

    if (!currnetCaravan) {
      return;
    }

    let totals = {
      totalRentalPrice: numOfDays * currnetCaravan.pricePerNight,
      totalInsurance: insurnance.insuranceType === "basic" ? 0 : numOfDays * 50,
      totalExtras: calculateExtrasTotal(panelData),
      totalCancellation:
        cancelPolicy.policyChoice === "basic" ? 0 : numOfDays * 10,
    };
    let grandTotal = Object.values(totals).reduce(
      (sum, value) => sum + value,
      0
    );
    let grandTotals = { ...totals, grandTotal };
    return grandTotals;
  } catch (err) {
    console.log("calculateTotalPrice err", err);
  }
  //console.log("extra total", totals.totalExtras);
  //console.log("grandTotal", grandTotals);
};

export { calculateExtrasTotal, calculateTotalPrice };
