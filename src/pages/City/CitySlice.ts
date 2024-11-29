// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.CITY}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllCity = createAsyncThunk(
    "city/fetchAllCity", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getCity = createAsyncThunk(
    "city/getAllCity", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createCity = createAsyncThunk(
    "city/createCity", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateCity = createAsyncThunk(
    "city/updateCity", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteCity = createAsyncThunk(
    "city/deleteCity", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const citySlice = createSlice({
    name: 'city',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllCity.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getCity.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteCity.fulfilled, (state, action)=>{
            //fetchAllCity();
        })
        .addCase(updateCity.fulfilled, (state, action)=>{
            fetchAllCity();
        })
    }
})

export default citySlice.reducer;