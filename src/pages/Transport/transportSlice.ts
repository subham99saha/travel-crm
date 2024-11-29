// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.TRANSPORT}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllTransport = createAsyncThunk(
    "transport/fetchAllTransport", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const fetchTransportByCity = createAsyncThunk(
    "transport/fetchTransportByCity", 
    async(id)=>{
        const { data } = await axios.get(`${URL}/find-by-city/${JSON.stringify(id)}`);
        return data;
});

export const getTransport = createAsyncThunk(
    "transport/getAllTransport", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createTransport = createAsyncThunk(
    "transport/createTransport", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateTransport = createAsyncThunk(
    "transport/updateTransport", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteTransport = createAsyncThunk(
    "transport/deleteTransport", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const transportSlice = createSlice({
    name: 'transport',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllTransport.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getTransport.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(fetchTransportByCity.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
        .addCase(deleteTransport.fulfilled, (state, action)=>{
            //fetchAllTransport();
        })
        .addCase(updateTransport.fulfilled, (state, action)=>{
            fetchAllTransport();
        })
    }
})

export default transportSlice.reducer;