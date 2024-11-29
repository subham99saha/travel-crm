// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.FLIGHT}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllFlight = createAsyncThunk(
    "flight/fetchAllFlight", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const fetchFlightByCity = createAsyncThunk(
    "flight/fetchFlightByCity", 
    async(id)=>{
        const { data } = await axios.get(`${URL}/find-by-city/${id}`);
        return data;
});

export const getFlight = createAsyncThunk(
    "flight/getAllFlight", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createFlight = createAsyncThunk(
    "flight/createFlight", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateFlight = createAsyncThunk(
    "flight/updateFlight", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteFlight = createAsyncThunk(
    "flight/deleteFlight", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const flightSlice = createSlice({
    name: 'flight',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllFlight.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getFlight.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(fetchFlightByCity.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
        .addCase(deleteFlight.fulfilled, (state, action)=>{
            //fetchAllFlight();
        })
        .addCase(updateFlight.fulfilled, (state, action)=>{
            fetchAllFlight();
        })
    }
})

export default flightSlice.reducer;