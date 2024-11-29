// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.DEPARTMENT}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllDepartment = createAsyncThunk(
    "department/fetchAllDepartment", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        return data;
});

export const getDepartment = createAsyncThunk(
    "department/getAllDepartment", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createDepartment = createAsyncThunk(
    "department/createDepartment", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});

export const updateDepartment = createAsyncThunk(
    "department/updateDepartment", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteDepartment = createAsyncThunk(
    "department/deleteDepartment", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const departmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllDepartment.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getDepartment.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteDepartment.fulfilled, (state, action)=>{
            //fetchAllDepartment();
        })
        .addCase(updateDepartment.fulfilled, (state, action)=>{
            fetchAllDepartment();
        })
    }
})

export default departmentSlice.reducer;