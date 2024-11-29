// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllVendor = createAsyncThunk(
    "vendor/fetchAllVendor", 
    async(type)=>{
        const { data } = await axios.get(`${URL}/${type}`);
        return data;
});

export const getVendor = createAsyncThunk(
    "vendor/getAllVendor", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createVendor = createAsyncThunk(
    "vendor/createVendor", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateVendor = createAsyncThunk(
    "vendor/updateVendor", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteVendor = createAsyncThunk(
    "vendor/deleteVendor", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const vendorSlice = createSlice({
    name: 'vendor',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllVendor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getVendor.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteVendor.fulfilled, (state, action)=>{
            //fetchAllVendor();
        })
        .addCase(updateVendor.fulfilled, (state, action)=>{
            fetchAllVendor();
        })
    }
})

export default vendorSlice.reducer;