import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = "http://127.0.0.1:3001/super-itinerary-travel-type/";

const initialState: any = [];

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  console.log("bbb: ", response.data);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      console.log("reducer: ", action);
      return action.payload;
    });
  },
});

export const selectAllUsers = (state: any) => state.users;

export default usersSlice.reducer;
