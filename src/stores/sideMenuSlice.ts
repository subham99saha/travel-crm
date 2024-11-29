// @ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  userType?: string;
  subMenu?: Menu[];
  ignore?: boolean;
  create: number;
  update: number;
  view: number;
  delete: number;
  id: number;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

let userType = "S";
if (localStorage.getItem("userInfo")) {
  userType = JSON.parse(localStorage.getItem("userInfo"))["resData"][
    "userType"
  ];
}

const initialState: SideMenuState = {
  menu: [],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {
    addItems: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;
export const { addItems } = sideMenuSlice.actions;

export default sideMenuSlice.reducer;
