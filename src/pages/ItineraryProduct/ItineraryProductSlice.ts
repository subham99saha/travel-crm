// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY_PRODUCT}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllItineraryProduct = createAsyncThunk(
    "itineraryProduct/fetchAllItineraryProduct", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getItineraryProduct = createAsyncThunk(
    "itineraryProduct/getAllItineraryProduct", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createItineraryProduct = createAsyncThunk(
    "itineraryProduct/createItineraryProduct", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateItineraryProduct = createAsyncThunk(
    "itineraryProduct/updateItineraryProduct", 
    async(updateData)=>{
        //console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteItineraryProduct = createAsyncThunk(
    "itineraryProduct/deleteItineraryProduct", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const itineraryProductSlice = createSlice({
    name: 'itineraryProduct',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllItineraryProduct.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getItineraryProduct.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteItineraryProduct.fulfilled, (state, action)=>{
            //fetchAllItineraryProduct();
        })
        .addCase(updateItineraryProduct.fulfilled, (state, action)=>{
            fetchAllItineraryProduct();
        })
    }
})

export default itineraryProductSlice.reducer;