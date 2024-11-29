// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.LEAD_SOURCE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllLeadSource = createAsyncThunk(
    "leadSource/fetchAllLeadSource", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getLeadSource = createAsyncThunk(
    "leadSource/getAllLeadSource", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createLeadSource = createAsyncThunk(
    "leadSource/createLeadSource", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateLeadSource = createAsyncThunk(
    "leadSource/updateLeadSource", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteLeadSource = createAsyncThunk(
    "leadSource/deleteLeadSource", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const leadSourceSlice = createSlice({
    name: 'leadSource',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllLeadSource.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getLeadSource.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteLeadSource.fulfilled, (state, action)=>{
            //fetchAllLeadSource();
        })
        .addCase(updateLeadSource.fulfilled, (state, action)=>{
            fetchAllLeadSource();
        })
    }
})

export default leadSourceSlice.reducer;