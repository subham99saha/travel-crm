// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.TRAVEL_REQUIREMENT}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllTravelRequirement = createAsyncThunk(
    "travelRequirement/fetchAllTravelRequirement", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getTravelRequirement = createAsyncThunk(
    "travelRequirement/getAllTravelRequirement", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createTravelRequirement = createAsyncThunk(
    "travelRequirement/createTravelRequirement", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateTravelRequirement = createAsyncThunk(
    "travelRequirement/updateTravelRequirement", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteTravelRequirement = createAsyncThunk(
    "travelRequirement/deleteTravelRequirement", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const travelRequirementSlice = createSlice({
    name: 'travelRequirement',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllTravelRequirement.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getTravelRequirement.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteTravelRequirement.fulfilled, (state, action)=>{
            //fetchAllTravelRequirement();
        })
        .addCase(updateTravelRequirement.fulfilled, (state, action)=>{
            fetchAllTravelRequirement();
        })
    }
})

export default travelRequirementSlice.reducer;