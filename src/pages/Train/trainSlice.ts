// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.TRAIN}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllTrain = createAsyncThunk(
    "train/fetchAllTrain", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const fetchTrainByCity = createAsyncThunk(
    "train/fetchTrainByCity", 
    async(id)=>{
        const { data } = await axios.get(`${URL}/find-by-city/${id}`);
        return data;
});

export const getTrain = createAsyncThunk(
    "train/getAllTrain", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createTrain = createAsyncThunk(
    "train/createTrain", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateTrain = createAsyncThunk(
    "train/updateTrain", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteTrain = createAsyncThunk(
    "train/deleteTrain", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const trainSlice = createSlice({
    name: 'train',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllTrain.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getTrain.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(fetchTrainByCity.fulfilled, (state, action)=>{
            state.data = action.payload;
        })
        .addCase(deleteTrain.fulfilled, (state, action)=>{
            //fetchAllTrain();
        })
        .addCase(updateTrain.fulfilled, (state, action)=>{
            fetchAllTrain();
        })
    }
})

export default trainSlice.reducer;