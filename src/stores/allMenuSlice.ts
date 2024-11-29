import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import ApiConfig from "../../apiconfig.json";
import axios from "axios";
import { MenuDataItem } from "../types/types";

export const fetchMenus = createAsyncThunk("menus/fetchMenus", async () => {
  const response = await axios.get(
    `${ApiConfig.API_URL}${ApiConfig.API_ENDPOINT.MENUS}`
  );
  return response.data;
});

export interface SideMenuState {
  menu: Array<MenuDataItem>;
}

const initialState: SideMenuState = {
  menu: [],
};

export const allMenuSlice = createSlice({
  name: "allMenu",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.menu = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchMenus.fulfilled, (state, action) => {
      state.menu = action.payload;
    });
  },
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;
export const { addItems } = allMenuSlice.actions;

export default allMenuSlice.reducer;
