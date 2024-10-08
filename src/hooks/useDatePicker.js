import { useSelector } from "react-redux"
import moment from "moment/moment"

const useDatePicker = () => {
    let timeStampedDates = useSelector((storePie) => storePie.dateSlice);

    let stampsConverted = {
        startDate: moment(timeStampedDates.startDate).toDate(),
        endDate: moment(timeStampedDates.endDate).toDate()
    }
    return stampsConverted;
}

export default useDatePicker;