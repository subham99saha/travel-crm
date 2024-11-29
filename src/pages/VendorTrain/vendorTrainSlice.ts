// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.TRAIN}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllVendorTrain = createAsyncThunk(
    "vendorTrain/fetchAllVendorTrain", 
    async()=>{
        const { data } = await axios.get(`${URL}/v`);
        return data;
});

export const getVendorTrain = createAsyncThunk(
    "vendorTrain/getAllVendorTrain", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createVendorTrain = createAsyncThunk(
    "vendorTrain/createVendorTrain", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateVendorTrain = createAsyncThunk(
    "vendorTrain/updateVendorTrain", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteVendorTrain = createAsyncThunk(
    "vendorTrain/deleteVendorTrain", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const vendorTrainSlice = createSlice({
    name: 'vendorTrain',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllVendorTrain.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getVendorTrain.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteVendorTrain.fulfilled, (state, action)=>{
            //fetchAllVendorTrain();
        })
        .addCase(updateVendorTrain.fulfilled, (state, action)=>{
            fetchAllVendorTrain();
        })
    }
})

export default vendorTrainSlice.reducer;