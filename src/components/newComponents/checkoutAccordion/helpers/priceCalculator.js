import axios from "axios";
import getCarvanData from "../../../../utils/helpers/getCaravanData";

const calculateExtrasTotal = (inputState) => {
  if (!inputState[5]) return 0;
  const extrasArray = Object.values(inputState[5]);

  let grandTotal = 0;
  for (const extra of extrasArray) {
    grandTotal += extra.totalPrice;
  }
  return grandTotal;
};

const calculateTotalPrice = async (panelData, caravanDetails) => {
  //console.log("calculatePrice", panelData);
  const initData = panelData[0];
  const numOfDays = +panelData[0].numOfDays;
  const insurance = panelData[4];
  const cancelPolicy = panelData[6];
  //console.log("initData", initData);
  try {
    const currnetCaravan = caravanDetails;
    //console.log("currentCaravan", currnetCaravan);

    if (!currnetCaravan) {
      return;
    }

    const insuranceCalc = () => {
      if (insurance.insuranceType === "basic") {
        if (insurance.basicIncluded) return 0;
        if (insurance.basicIncluded === false) {
          console.log(
            "insurance calc",
            numOfDays * +insurance.basicInsurancePrice
          );

          return numOfDays * +insurance.basicInsurancePrice;
        }
      }
      if (insurance.insuranceType === "premium") {
        return +numOfDays * +insurance.premiumInsurancePrice;
      } else {
        //console.log("no insuranceType returning null");
        return null;
      }
    };

    let totals = {
      totalRentalPrice: numOfDays * +currnetCaravan.priceDetails.pricePerNight,
      totalInsurance: insuranceCalc(),
      totalExtras: calculateExtrasTotal(panelData),
      totalCancelation:
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
