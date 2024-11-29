// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.EMPLOYEE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllEmployee = createAsyncThunk(
    "employee/fetchAllEmployee", 
    async()=>{
        const { data } = await axios.get(`${URL}`);
        //console.log(data);
        return data;
});

export const getEmployee = createAsyncThunk(
    "employee/getAllEmployee", 
    async(id)=>{
        console.log(id)
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
});

export const createEmployee = createAsyncThunk(
    "employee/createEmployee", 
    async(addData)=>{
        const { data } = await axios.post(`${URL}`, addData);
        return data;
});




export const updateEmployee = createAsyncThunk(
    "employee/updateEmployee", 
    async(updateData)=>{
        console.log("Reducer: ", updateData.id);
        console.log(updateDate)
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
});

export const deleteEmployee = createAsyncThunk(
    "employee/deleteEmployee", 
    async(id)=>{
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
});



const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllEmployee.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.data = action.payload
        })
        .addCase(getEmployee.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            //state.data = state.data.find((data) => data.id == action.payload);
            state.data = action.payload;
        })
        .addCase(deleteEmployee.fulfilled, (state, action)=>{
            //fetchAllEmployee();
        })
        .addCase(updateEmployee.fulfilled, (state, action)=>{
            fetchAllEmployee();
        })
    }
})

export default employeeSlice.reducer;