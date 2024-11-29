// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.SEND_PROPOSAL}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllProposal = createAsyncThunk(
    "proposal/fetchAllProposal", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getProposal = createAsyncThunk(
    "proposal/getAllProposal", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createProposal = createAsyncThunk(
    "proposal/createProposal", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateProposal = createAsyncThunk(
    "proposal/updateProposal", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteProposal = createAsyncThunk(
    "proposal/deleteProposal", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const proposalSlice = createSlice({
    name: 'proposal',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllProposal.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getProposal.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteProposal.fulfilled, (state, action)=>{
            //fetchAllProposal();
        })
        .addCase(updateProposal.fulfilled, (state, action)=>{
            fetchAllProposal();
        })
    }
})

export default proposalSlice.reducer;