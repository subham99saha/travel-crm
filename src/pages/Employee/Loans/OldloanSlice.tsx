// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../../apiconfig.json";


const loanURL = `${api.API_URL}${api.API_ENDPOINT.LOAN}`;

const initialState = {
    loansData:[],
    isLoading: true
}



export const createLoan = createAsyncThunk(
    "employee/createLoan", 
    async(addData)=>{
        console.log(addData);
        const { data } = await axios.post(`${loanURL}`, addData);
        return data;
});

export const fetchAllLoans = createAsyncThunk(
    "employee/fetchAllLoans", 
    async()=>{
        const { data } = await axios.get(`${loanURL}`);
        console.log("Loan Data",data)
        return data;
});

export const getLoan = createAsyncThunk(
    "employee/getLoan", 
    async(id)=>{
        console.log("Get Loan Data",`${loanURL}/${id}`)
        const { data } = await axios.post(`${loanURL}/${id}`);
        
        return data;
});




const loanSlice = createSlice({
    name: 'loan',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchAllLoans.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.loansData = action.payload
        })
        .addCase(getLoan.fulfilled, (state, action)=>{
            console.log("GetData:", action.payload);
            state.loansData.push(action.payload);
        })
        // .addCase(deleteEmployee.fulfilled, (state, action)=>{
        //     //fetchAllEmployee();
        // })
        // .addCase(updateEmployee.fulfilled, (state, action)=>{
        //     fetchAllEmployee();
        // })
    }
})

export default loanSlice.reducer;