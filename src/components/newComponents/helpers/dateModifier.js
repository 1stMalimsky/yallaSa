import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import localeData from "dayjs/plugin/localeData";
import "dayjs/locale/he";

dayjs.extend(advancedFormat);
dayjs.extend(localeData);

dayjs.locale("he");
const dateModifier = (dateToModify) => {
  const date = dayjs.unix(dateToModify);

  const dayOfWeek = date.format("dddd");
  const dayNumber = date.format("D");
  const month = date.format("MMMM");
  const newDateArr = [dayOfWeek, dayNumber, month];

  return newDateArr;
};

export default dateModifier;
