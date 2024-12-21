import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  fullName: null,
  email: null,
  phone: null,
  license: null,
  isOwner: null,
};

const userSlice = createSlice({
  name: "userDetailsSlice",
  initialState,
  reducers: {
    updateUserDetails: (state, action) => {
      const { _id, fullName, email, phone, license, isOwner } = action.payload;
      state._id = _id;
      state.fullName = fullName;
      state.email = email;
      state.phone = phone;
      state.license = license;
      state.isOwner = isOwner;
    },
    clearUserDetails: (state) => {
      // Reset the state to initial state
      return initialState;
    },
  },
});

export const userDetailsActions = userSlice.actions;
export default userSlice.reducer;
