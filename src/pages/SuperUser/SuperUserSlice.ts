import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";
import { SuperUser } from "../../types/types";

const URL = `${api.API_URL}${api.API_ENDPOINT.SUPER_USER}`;

const initialState: {
  data: SuperUser[];
  isLoading: boolean;
} = {
  data: [],
  isLoading: true,
};

export const fetchAllSuperUser = createAsyncThunk(
  "superuser/fetchAllSuperUser",
  async () => {
    const { data } = await axios.get<SuperUser[]>(`${URL}`);
    return data;
  }
);

export const getSuperUser = createAsyncThunk(
  "superuser/getAllSuperUser",
  async (id) => {
    const { data } = await axios.post(`${URL}/${id}`);
    return data;
  }
);

export const createSuperUser = createAsyncThunk(
  "superuser/createSuperUser",
  async (addData) => {
    const { data } = await axios.post(`${URL}`, addData);
    return data;
  }
);

export const updateSuperUser = createAsyncThunk(
  "superuser/updateSuperUser",
  async (updateData: Partial<SuperUser>) => {
    console.log("Reducer: ", updateData.id);
    const { data } = await axios.patch(
      `${URL}/${updateData.id}`,
      updateData
    );
    return data;
  }
);

export const deleteSuperUser = createAsyncThunk(
  "superuser/deleteSuperUser",
  async (id: string) => {
    const { data } = await axios.delete(`${URL}/${id}`);
    return data;
  }
);

const superUserSlice = createSlice({
  name: "superuser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSuperUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getSuperUser.fulfilled, (state, action) => {
        console.log("GetData:", action.payload);
        //state.data = state.data.find((data) => data.id == action.payload);
        state.data = action.payload;
      })
      .addCase(deleteSuperUser.fulfilled, (state, action) => {
        //fetchAllSuperUser();
      })
      .addCase(updateSuperUser.fulfilled, (state, action) => {
        fetchAllSuperUser();
      });
  },
});

export default superUserSlice.reducer;
