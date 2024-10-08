import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const handleSearchClick = (pickupDate, dropOffDate) => {

    const dispatch = useDispatch();
    const currentDate = new Date();

    const adjustedCurrentDate = currentDate.setHours(0, 0, 0, 0);
    if (
        isNaN(pickupDate) ||
        isNaN(dropOffDate) ||
        pickupDate < adjustedCurrentDate ||
        dropOffDate < adjustedCurrentDate ||
        pickupDate >= dropOffDate
    ) {
        return toast.error("Please enter valid dates!");
    }
    dispatch(dateActions.setStartDate(chosenDates.start));
    dispatch(dateActions.setEndDate(chosenDates.end));
    dispatch(dateActions.calculateDays());
    navigate(ROUTES.INVENTORY);
};
export default handleSearchClick;