// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.TRAVEL_TYPE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllTravelType = createAsyncThunk(
    "travelType/fetchAllTravelType", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getTravelType = createAsyncThunk(
    "travelType/getAllTravelType", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createTravelType = createAsyncThunk(
    "travelType/createTravelType", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateTravelType = createAsyncThunk(
    "travelType/updateTravelType", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteTravelType = createAsyncThunk(
    "travelType/deleteTravelType", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const travelTypeSlice = createSlice({
    name: 'travelType',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllTravelType.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getTravelType.fulfilled, (state, action)=>{
            //console.log("GetData:", action.payload);
            state.data = action.payload;
        })
        .addCase(deleteTravelType.fulfilled, (state, action)=>{
            //fetchAllTravelType();
        })
        .addCase(updateTravelType.fulfilled, (state, action)=>{
            fetchAllTravelType();
        })
    }
})

export default travelTypeSlice.reducer;