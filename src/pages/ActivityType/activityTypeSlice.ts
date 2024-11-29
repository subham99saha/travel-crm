// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.ACTIVITY_TYPE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllActivityType = createAsyncThunk(
    "activityType/fetchAllActivityType", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getActivityType = createAsyncThunk(
    "activityType/getAllActivityType", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createActivityType = createAsyncThunk(
    "activityType/createActivityType", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateActivityType = createAsyncThunk(
    "activityType/updateActivityType", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteActivityType = createAsyncThunk(
    "activityType/deleteActivityType", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const activityTypeSlice = createSlice({
    name: 'activityType',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllActivityType.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getActivityType.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteActivityType.fulfilled, (state, action)=>{
            //fetchAllActivityType();
        })
        .addCase(updateActivityType.fulfilled, (state, action)=>{
            fetchAllActivityType();
        })
    }
})

export default activityTypeSlice.reducer;