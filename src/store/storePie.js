import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme";
import dateSliceReducer from "./dateHandler"
import authSliceReducer from "./auth"

const store = configureStore({
    reducer: {
        darkThemeSlice: darkThemeReducer,
        dateSlice: dateSliceReducer,
        authSlice: authSliceReducer
    },
});

export default store;