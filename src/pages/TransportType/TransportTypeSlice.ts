// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.SUPER_TRANSPORT_TYPE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllTransportType = createAsyncThunk(
    "transportType/fetchAllTransportType", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getTransportType = createAsyncThunk(
    "transportType/getAllTransportType", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createTransportType = createAsyncThunk(
    "transportType/createTransportType", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateTransportType = createAsyncThunk(
    "transportType/updateTransportType", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteTransportType = createAsyncThunk(
    "transportType/deleteTransportType", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const TransportTypeSlice = createSlice({
    name: 'TransportType',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllTransportType.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getTransportType.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteTransportType.fulfilled, (state, action)=>{
            //fetchAllTransportType();
        })
        .addCase(updateTransportType.fulfilled, (state, action)=>{
            fetchAllTransportType();
        })
    }
})

export default TransportTypeSlice.reducer;