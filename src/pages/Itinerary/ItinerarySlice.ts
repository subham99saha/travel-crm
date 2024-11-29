 // @ts-nocheck
 import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
 import axios from "axios";
 import api from "../../../apiconfig.json";
 
 
 const URL = `${api.API_URL}${api.API_ENDPOINT.ITINERARY}`;
 
 const initialState = {
     data: [],
     isLoading: true
 }
 
 export const uploadItineraryImage = createAsyncThunk(
     "itinerary/uploadImage", 
     async(fileData)=>{
         const { data } = await axios.post(`${URL}/upload-image`, fileData, {
             headers: {
               'Content-Type': 'multipart/form-data',
             },
           });
         return data;
 });
 
 export const uploadGalleryImage = createAsyncThunk(
     "itinerary/uploadMultiImage", 
     async(fileData)=>{
         const { data } = await axios.post(`${URL}/upload-multi-image`, fileData, {
             headers: {
               'Content-Type': 'multipart/form-data',
             },
           });
         return data;
 });
 
 export const deleteImage = createAsyncThunk(
     "itinerary/deleteImage", 
     async(payload)=>{
         const { data } = await axios.post(`${URL}/delete-image?folder=${payload.folder}`, payload);
         return data;
 });
 
 export const viewGallery = createAsyncThunk(
     "itinerary/viewGallery", 
     async()=>{
         const { data } = await axios.post(`${URL}/view-gallery`);
         return data;
 });
 
 export const fetchItineraryDetails = createAsyncThunk(
     "itinerary/fetchItineraryDetails", 
     async(id)=>{
         const { data } = await axios.post(`${URL}/fetchItineraryDetails/${id}`);
         return data;
 });
 
 export const fetchAllItinerary = createAsyncThunk(
     "itinerary/fetchAllItinerary", 
     async()=>{
         const { data } = await axios.get(`${URL}`);
         return data;
 });
 
 export const getItinerary = createAsyncThunk(
     "itinerary/getAllItinerary", 
     async(id)=>{
         const { data } = await axios.post(`${URL}/${id}`);
         return data;
 });
 
 export const createItinerary = createAsyncThunk(
     "itinerary/createItinerary", 
     async(addData)=>{
         const { data } = await axios.post(`${URL}`, addData);
         return data;
 });
 
 export const updateItinerary = createAsyncThunk(
     "itinerary/updateItinerary", 
     async(updateData)=>{
         console.log("Reducer: ", updateData.id);
         const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
         return data;
 });
 
 export const deleteItinerary = createAsyncThunk(
     "itinerary/deleteItinerary", 
     async(id)=>{
         const { data } = await axios.delete(`${URL}/${id}`);
         return data;
 });
 
 
 
 const itinerarySlice = createSlice({
     name: 'itinerary',
     initialState,
     reducers: {},
     extraReducers: (builder)=>{
         builder
         .addCase(fetchAllItinerary.fulfilled, (state, action)=>{
             state.isLoading = false;
             state.data = action.payload
         })
         .addCase(viewGallery.fulfilled, (state, action)=>{
             state.isLoading = false;
             state.data = action.payload
         })
         .addCase(getItinerary.fulfilled, (state, action)=>{
             // console.log("GetData:", action.payload);
             state.data = action.payload;
         })
         .addCase(deleteItinerary.fulfilled, (state, action)=>{
             console.log(state.data)
             //state.data = action.payload;
             const {
                arg: { id },
              } = action.meta;
              if (id) {
                state.data = state.data.filter((item) => item.id !== id);
                //state.tours = state.tours.filter((item) => item._id !== id);
              }
         })
         .addCase(updateItinerary.fulfilled, (state, action)=>{
             fetchAllItinerary();
         })
     }
 })
 
 export default itinerarySlice.reducer;