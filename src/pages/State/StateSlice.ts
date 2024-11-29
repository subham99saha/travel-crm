// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.STATE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllState = createAsyncThunk(
    "state/fetchAllState", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getState = createAsyncThunk(
    "state/getAllState", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createState = createAsyncThunk(
    "state/createState", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateState = createAsyncThunk(
    "state/updateState", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteState = createAsyncThunk(
    "state/deleteState", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const stateSlice = createSlice({
    name: 'state',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllState.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getState.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteState.fulfilled, (state, action)=>{
            //fetchAllState();
        })
        .addCase(updateState.fulfilled, (state, action)=>{
            fetchAllState();
        })
    }
})

export default stateSlice.reducer;