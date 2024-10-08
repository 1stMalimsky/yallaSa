import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    payload: null,
    userId: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        tempLogin(state) {
            state.isLoggedIn = !state.isLoggedIn;
        }
        ,
        login(state, action) {
            if (!action || !action.payload) {
                return;
            }
            state.isLoggedIn = true;
            state.payload = action.payload;
            state.userId = action.payload._id;

        },
        logout(state) {
            state.isLoggedIn = false;
            state.payload = null;
            localStorage.removeItem('token');
        },
        getId(action) {
            return action.payload._id
        }
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
