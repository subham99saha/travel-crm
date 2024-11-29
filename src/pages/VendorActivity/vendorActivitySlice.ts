// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.ACTIVITY}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllVendorActivity = createAsyncThunk(
    "vendoractivity/fetchAllVendorActivity", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const fetchVendorActivityByCity = createAsyncThunk(
    "vendoractivity/fetchVendorActivityByCity", 
    async(id)=>{
        const { data } = await axios.get(`${URL}/find-by-city/${JSON.stringify(id)}`);
        return data;
});

export const getVendorActivity = createAsyncThunk(
    "vendoractivity/getAllVendorActivity", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createVendorActivity = createAsyncThunk(
    "vendoractivity/createVendorActivity", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateVendorActivity = createAsyncThunk(
    "vendoractivity/updateVendorActivity", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteVendorActivity = createAsyncThunk(
    "vendoractivity/deleteVendorActivity", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const vendorActivitySlice = createSlice({
    name: 'vendoractivity',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllVendorActivity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getVendorActivity.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(fetchVendorActivityByCity.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
        .addCase(deleteVendorActivity.fulfilled, (state, action)=>{
            //fetchAllVendorActivity();
        })
        .addCase(updateVendorActivity.fulfilled, (state, action)=>{
            fetchAllVendorActivity();
        })
    }
})

export default vendorActivitySlice.reducer;