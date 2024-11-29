// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.CRUISE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllCruise = createAsyncThunk(
    "cruise/fetchAllCruise", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const fetchCruiseByCity = createAsyncThunk(
    "cruise/fetchCruiseByCity", 
    async(id)=>{
        const { data } = await axios.get(`${URL}/find-by-city/${id}`);
        return data;
});

export const getCruise = createAsyncThunk(
    "cruise/getAllCruise", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createCruise = createAsyncThunk(
    "cruise/createCruise", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateCruise = createAsyncThunk(
    "cruise/updateCruise", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteCruise = createAsyncThunk(
    "cruise/deleteCruise", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const cruiseSlice = createSlice({
    name: 'cruise',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllCruise.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getCruise.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(fetchCruiseByCity.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
        .addCase(deleteCruise.fulfilled, (state, action)=>{
            //fetchAllCruise();
        })
        .addCase(updateCruise.fulfilled, (state, action)=>{
            fetchAllCruise();
        })
    }
})

export default cruiseSlice.reducer;