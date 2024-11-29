//@ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.CLIENT}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllClient = createAsyncThunk(
    "client/fetchAllClient", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const fetchAllClientBC = createAsyncThunk(
    "client/fetchAllClientBC", 
    async()=>{
        const { data } = await axios.get(`${URL}/bc`);
        return data;
});

export const fetchAllClientBB = createAsyncThunk(
    "client/fetchAllClientBB", 
    async()=>{
        const { data } = await axios.get(`${URL}/bb`);
        return data;
});

export const fetchAllClientCor = createAsyncThunk(
    "client/fetchAllClientCor", 
    async()=>{
        const { data } = await axios.get(`${URL}/cor`);
        return data;
});

export const getClient = createAsyncThunk(
    "client/getAllClient", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createClient = createAsyncThunk(
    "client/createClient", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateClient = createAsyncThunk(
    "client/updateClient", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteClient = createAsyncThunk(
    "client/deleteClient", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const clientSlice = createSlice({
    name: 'client',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllClient.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(fetchAllClientBC.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(fetchAllClientBB.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(fetchAllClientCor.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getClient.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteClient.fulfilled, (state, action)=>{
            //fetchAllClientBC();
        })
        .addCase(updateClient.fulfilled, (state, action)=>{
            fetchAllClientBC();
            fetchAllClientBB();
            fetchAllClientCor();
        })
    }
})

export default clientSlice.reducer;
