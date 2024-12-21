import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkTheme";
import dateSliceReducer from "./dateHandler";
import authSliceReducer from "./auth";
import userDetailsReducer from "./userDetails";
const store = configureStore({
  reducer: {
    darkThemeSlice: darkThemeReducer,
    dateSlice: dateSliceReducer,
    authSlice: authSliceReducer,
    userSlice: userDetailsReducer,
  },
});

export default store;
