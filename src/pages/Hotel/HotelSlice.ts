 // @ts-nocheck
 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import axios from "axios";
 import api from "../../../apiconfig.json";
 
 
 const URL = `${api.API_URL}${api.API_ENDPOINT.HOTEL}`;
 
 const initialState = {
     data: [],
     isLoading: true
 }
 
 export const fetchAllHotel = createAsyncThunk(
     "hotel/fetchAllHotel", 
     async()=>{
         const { data } = await axios.get(`${URL}`);
         return data;
 });

 export const searchByCity = createAsyncThunk(
    "hotel/searchByCity", 
    async(id)=>{
        const { data } = await axios.post(`${URL}/search-by-city/${id}`);
        return data;
});
 
 export const getHotel = createAsyncThunk(
     "hotel/getAllHotel", 
     async(id)=>{
         const { data } = await axios.post(`${URL}/${id}`);
         return data;
 });
 
 export const createHotel = createAsyncThunk(
     "hotel/createHotel", 
     async(addData)=>{
         const { data } = await axios.post(`${URL}`, addData);
         return data;
 });
 
 export const updateHotel = createAsyncThunk(
     "hotel/updateHotel", 
     async(updateData)=>{
         console.log("Reducer: ", updateData.id);
         const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
         return data;
 });
 
 export const deleteHotel = createAsyncThunk(
     "hotel/deleteHotel", 
     async(id)=>{
         const { data } = await axios.delete(`${URL}/${id}`);
         return data;
 });
 
 
 
 const hotelSlice = createSlice({
     name: 'hotel',
     initialState,
     reducers: {},
     extraReducers: (builder)=>{
         builder
         .addCase(fetchAllHotel.fulfilled, (state, action)=>{
             state.isLoading = false;
             state.data = action.payload
         })
         .addCase(searchByCity.fulfilled, (state, action)=>{
            state.data = action.payload
        })
         .addCase(getHotel.fulfilled, (state, action)=>{
             state.data = action.payload;
         })
         .addCase(deleteHotel.fulfilled, (state, action)=>{
             fetchAllHotel();
         })
         .addCase(updateHotel.fulfilled, (state, action)=>{
             fetchAllHotel();
         })
     }
 })
 
 export default hotelSlice.reducer;