// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL}`;

const initialState = {
    data: [],
    isLoading: true
}

export const fetchAllVendorHotel = createAsyncThunk(
    "vendorHotel/fetchAllVendorHotel",
    async (userData) => {
        if (userData.userType === "S") {
            const { data } = await axios.get(`${URL}`);
            return data;
        } else {
            const { data } = await axios.post(`${URL}/find-by-vendor/${userData.userId}`);
            console.log(userData)
            return data;
        }
    });

export const fetchVendorHotelByCity = createAsyncThunk(
    "vendorHotel/fetchVendorHotelByCity",
    async (id) => {
        const { data } = await axios.get(`${URL}/find-by-city/${JSON.stringify(id)}`);
        return data;
    });

export const fetchVendorHotelByVendor = createAsyncThunk(
    "vendorHotel/fetchVendorHotelByVendor",
    async (id) => {
        const { data } = await axios.post(`${URL}/${api.API_ENDPOINT}/find-by-vendor/${id}`);
        //console.log(`${URL}/${api.API_ENDPOINT}/find-by-vendor/${id}`)
        return data;
    });

export const getVendorHotel = createAsyncThunk(
    "vendorHotel/getAllVendorHotel",
    async (id) => {
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
    });

export const createVendorHotel = createAsyncThunk(
    "vendorHotel/createVendorHotel",
    async (addData) => {
        const { data } = await axios.post(`${URL}`, addData);
        return data;
    });

export const updateVendorHotel = createAsyncThunk(
    "vendorHotel/updateVendorHotel",
    async (updateData) => {
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
    });

export const deleteVendorHotel = createAsyncThunk(
    "vendorHotel/deleteVendorHotel",
    async (id) => {
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
    });



const vendorHotelSlice = createSlice({
    name: 'vendorHotel',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVendorHotel.fulfilled, (state, action) => {
                console.log(state)
                console.log(action)
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(getVendorHotel.fulfilled, (state, action) => {
                console.log("GetData:", action.payload);
                //state.data = state.data.find((data) => data.id == action.payload);
                state.data = action.payload;
            })
            .addCase(fetchVendorHotelByCity.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(fetchVendorHotelByVendor.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteVendorHotel.fulfilled, (state, action) => {
                //fetchAllVendorHotel();
            })
            .addCase(updateVendorHotel.fulfilled, (state, action) => {
                fetchAllVendorHotel();
            })
    }
})

export default vendorHotelSlice.reducer;