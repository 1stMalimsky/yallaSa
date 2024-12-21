import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define an asynchronous thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "userDetails/fetchUserDetails",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`/api/users/${userId}`);
      return response.data; // This will be used to fulfill the action
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
