// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.CURRENCY}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllCurrency = createAsyncThunk(
    "currency/fetchAllCurrency", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getCurrency = createAsyncThunk(
    "currency/getAllCurrency", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createCurrency = createAsyncThunk(
    "currency/createCurrency", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateCurrency = createAsyncThunk(
    "currency/updateCurrency", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteCurrency = createAsyncThunk(
    "currency/deleteCurrency", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllCurrency.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getCurrency.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteCurrency.fulfilled, (state, action)=>{
            //fetchAllCurrency();
        })
        .addCase(updateCurrency.fulfilled, (state, action)=>{
            fetchAllCurrency();
        })
    }
})

export default currencySlice.reducer;