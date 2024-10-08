import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";

const initialState = {
    startDate: "",
    endDate: "",
    numOfDays: "",
};

const dateSlice = createSlice({
    name: "dateHandler",
    initialState,
    reducers: {
        setStartDate: (initialState, action) => {
            initialState.startDate = action.payload;
        },
        setEndDate: (initialState, action) => {
            initialState.endDate = action.payload;
        },
        calculateDays: (initialState) => {
            const date1 = moment(Number(initialState.startDate));
            const date2 = moment(Number(initialState.endDate));
            initialState.numOfDays = date2.diff(date1, 'days');
        }
    },
});


export const dateActions = dateSlice.actions;

export default dateSlice.reducer;