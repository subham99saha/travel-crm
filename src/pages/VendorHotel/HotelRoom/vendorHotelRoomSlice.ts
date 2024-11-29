// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL_ROOM}`;

const initialState = {
    data: [],
    isLoading: true
}

export const getHotelRoomsByHotel = createAsyncThunk(
    "hotelRoom/getHotelRoomsByHotel",
    async (hmId) => {
        const { data } = await axios.post(`${URL}/hotel/${hmId}`);
        console.log({ url: `${URL}/hotel/${hmId}`, data })
        return data;
    });

export const fetchAllVendorHotelRoom = createAsyncThunk(
    "vendorHotel/fetchAllVendorHotelRoom",
    async (hid) => {
        if (userData.userType === "S") {
            const { data } = await axios.get(`${URL}`);
            return data;
        } else {
            const { data } = await axios.post(`${URL}/find-by-vendor/${userData.userId}`);
            return data;
        }
    });

export const fetchVendorHotelByCity = createAsyncThunk(
    "vendorHotel/fetchVendorHotelByCity",
    async (id) => {
        const { data } = await axios.get(`${URL}/find-by-city/${JSON.stringify(id)}`);
        return data;
    });

export const getHotelRoom = createAsyncThunk(
    "vendorHotel/getHotelRoom",
    async (id) => {
        const { data } = await axios.post(`${URL}/${id}`);
        return data;
    });

export const getVendorHotelRoom = createAsyncThunk(
    "vendorHotel/getAllVendorHotelRoom",
    async (id) => {
        const { data } = await axios.post(`${URL}/hotel/${id}`);
        return data;
    });

export const createVendorHotelRoom = createAsyncThunk(
    "vendorHotel/createVendorHotelRoom",
    async (addData) => {
        const { data } = await axios.post(`${URL}`, addData);
        return data;
    });

export const updateVendorHotelRoom = createAsyncThunk(
    "vendorHotel/updateVendorHotelRoom",
    async (updateData) => {
        console.log("Reducer: ", updateData.id);
        const { data } = await axios.patch(`${URL}/${updateData.id}`, updateData);
        return data;
    });

export const deleteVendorHotelRoom = createAsyncThunk(
    "vendorHotel/deleteVendorHotelRoom",
    async (id) => {
        const { data } = await axios.delete(`${URL}/${id}`);
        return data;
    });



const vendorHotelRoomSlice = createSlice({
    name: 'vendorHotelRoom',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllVendorHotelRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(getHotelRoomsByHotel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(getHotelRoom.fulfilled, (state, action) => {
                //console.log("GetData:", action.payload);
                //state.data = state.data.find((data) => data.id == action.payload);
                state.data = action.payload;
            })
            .addCase(getVendorHotelRoom.fulfilled, (state, action) => {
                //console.log("GetData:", action.payload);
                //state.data = state.data.find((data) => data.id == action.payload);
                state.data = action.payload;
            })
            .addCase(fetchVendorHotelByCity.fulfilled, (state, action) => {
                state.data = action.payload;
            })
            .addCase(deleteVendorHotelRoom.fulfilled, (state, action) => {
                //fetchAllVendorHotelRoom();
            })
            .addCase(updateVendorHotelRoom.fulfilled, (state, action) => {
                fetchAllVendorHotelRoom();
            })
    }
})

export default vendorHotelRoomSlice.reducer;