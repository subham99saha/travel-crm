// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.CRUISE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllVendorCruise = createAsyncThunk(
    "vendorcruise/fetchAllVendorCruise", 
    async()=>{
        const { data } = await axios.get(`${URL}/v`);
        return data;
});

export const getVendorCruise = createAsyncThunk(
    "vendorcruise/getAllVendorCruise", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createVendorCruise = createAsyncThunk(
    "vendorcruise/createVendorCruise", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateVendorCruise = createAsyncThunk(
    "vendorcruise/updateVendorCruise", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteVendorCruise = createAsyncThunk(
    "vendorcruise/deleteVendorCruise", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const vendorCruiseSlice = createSlice({
    name: 'vendorCruise',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllVendorCruise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getVendorCruise.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteVendorCruise.fulfilled, (state, action)=>{
            //fetchAllVendorCruise();
        })
        .addCase(updateVendorCruise.fulfilled, (state, action)=>{
            fetchAllVendorCruise();
        })
    }
})

export default vendorCruiseSlice.reducer;