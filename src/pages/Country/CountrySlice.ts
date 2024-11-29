// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.COUNTRY}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllCountry = createAsyncThunk(
    "country/fetchAllCountry", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getCountry = createAsyncThunk(
    "country/getAllCountry", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createCountry = createAsyncThunk(
    "country/createCountry", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateCountry = createAsyncThunk(
    "country/updateCountry", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteCountry = createAsyncThunk(
    "country/deleteCountry", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const countrySlice = createSlice({
    name: 'country',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllCountry.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getCountry.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteCountry.fulfilled, (state, action)=>{
            //fetchAllCountry();
        })
        .addCase(updateCountry.fulfilled, (state, action)=>{
            fetchAllCountry();
        })
    }
})

export default countrySlice.reducer;