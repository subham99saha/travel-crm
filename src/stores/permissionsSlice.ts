import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import axios from "axios";
import apiConfig from "../../apiconfig.json";

export interface Permission {
  id: number;
  createdBy: string;
  menuTempName: string;
  menuTemp: string;
  createdAt: string;
  updatedAt: string;
}

const URL = `${apiConfig.API_URL}${apiConfig.API_ENDPOINT.MENU_PERMISSION}`;

export const fetchPermissions = createAsyncThunk(
  "permissions/fetchPermissions",
  async () => {
    const response = await axios.get<Permission[]>(URL);
    return response.data;
  }
);

export const createPermission = createAsyncThunk(
  "permissions/createPermission",
  async (addData: {
    createdBy: string;
    menuTempName: string;
    menuTemp: string;
  }) => {
    const response = await axios.post(URL, addData);
    return response.data;
  }
);

export const updatePermission = createAsyncThunk(
  "permissions/updatePermission",
  async (updateData: {
    id: string;
    createdBy: string;
    menuTempName: string;
    menuTemp: string;
  }) => {
    const response = await axios.patch(`${URL}/${updateData.id}`, updateData);
    console.log(response.data);
    return response.data;
  }
);

export const getPermission = createAsyncThunk(
  "permissions/getPermission",
  async (id: string) => {
    const response = await axios.post(`${URL}/${id}`);
    return response.data;
  }
);

export const deletePermission = createAsyncThunk(
  "permissions/deletePermission",
  async (id: string) => {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  }
);

export interface PermissionsState {
  permissions: Permission[];
}

const initialState: PermissionsState = {
  permissions: [],
};

const permissionsSlice = createSlice({
  name: "permissions",
  initialState,
  reducers: {
    setPermissions(state, action) {
      state.permissions.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPermissions.fulfilled, (state, action) => {
      state.permissions = action.payload;
    });
    builder.addCase(createPermission.fulfilled, (state, action) => {});
    builder.addCase(deletePermission.fulfilled, (state, action) => {});
  },
});

export const { setPermissions } = permissionsSlice.actions;
export const selectPermissions = (state: RootState) =>
  state.permissions.permissions;

export default permissionsSlice.reducer;
