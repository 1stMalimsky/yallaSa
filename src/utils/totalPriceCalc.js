const calcTotalPrice = (params, chosenCar, setTotalPrice) => {
    let numOfDays = params.numOfDays;
    let carPrice = numOfDays * chosenCar.price;
    let subTotal = 0;

    switch (+params.extrasCount) {
        case 1:
            subTotal = 25 * numOfDays;
            break;
        case 2:
            subTotal = 15 * numOfDays;
            break;
        case 3:
            subTotal = 40 * numOfDays;
            break;
        case 4:
            subTotal = 30 * numOfDays;
            break;
        case 5:
            subTotal = 55 * numOfDays;
            break;
        case 6:
            subTotal = 45 * numOfDays;
            break;
        case 7:
            subTotal = 70 * numOfDays;
            break;
        default:
            subTotal = 0;
    }
    return setTotalPrice(subTotal + carPrice);
};

export default calcTotalPrice;