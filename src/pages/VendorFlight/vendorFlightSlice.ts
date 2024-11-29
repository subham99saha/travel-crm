// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.FLIGHT}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllVendorFlight = createAsyncThunk(
    "vendorFlight/fetchAllVendorFlight", 
    async()=>{
        const { data } = await axios.get(`${URL}/v`);
        return data;
});

export const getVendorFlight = createAsyncThunk(
    "vendorFlight/getAllVendorFlight", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createVendorFlight = createAsyncThunk(
    "vendorFlight/createVendorFlight", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateVendorFlight = createAsyncThunk(
    "vendorFlight/updateVendorFlight", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteVendorFlight = createAsyncThunk(
    "vendorFlight/deleteVendorFlight", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const vendorFlightSlice = createSlice({
    name: 'vendorFlight',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllVendorFlight.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getVendorFlight.fulfilled, (state, action)=>{
            //console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteVendorFlight.fulfilled, (state, action)=>{
            //fetchAllVendorFlight();
        })
        .addCase(updateVendorFlight.fulfilled, (state, action)=>{
            fetchAllVendorFlight();
        })
    }
})

export default vendorFlightSlice.reducer;