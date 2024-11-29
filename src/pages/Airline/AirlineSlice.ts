// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.AIRLINE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllAirline = createAsyncThunk(
    "airline/fetchAllAirline", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getAirline = createAsyncThunk(
    "airline/getAllAirline", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createAirline = createAsyncThunk(
    "airline/createAirline", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateAirline = createAsyncThunk(
    "airline/updateAirline", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteAirline = createAsyncThunk(
    "airline/deleteAirline", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const airlineSlice = createSlice({
    name: 'airline',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllAirline.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getAirline.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteAirline.fulfilled, (state, action)=>{
            //fetchAllAirline();
        })
        .addCase(updateAirline.fulfilled, (state, action)=>{
            fetchAllAirline();
        })
    }
})

export default airlineSlice.reducer;