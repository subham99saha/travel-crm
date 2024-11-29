// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.VENDOR_HOTEL_ROOM}`;

const initialState = {
    data: [],
    isLoading: true
}

export const getHotelRoomByID = createAsyncThunk(
    "hotelRoom/getHotelRoomByID",
    async (roomId) => {
        const { data } = await axios.post(`${URL}/${roomId}`);
        return data;
    });

export const getHotelRoomsByHotel = createAsyncThunk(
    "hotelRoom/getHotelRoomsByHotel",
    async (hmId) => {
        const { data } = await axios.post(`${URL}/hotel/${hmId}`);
        console.log({ url: `${URL}/hotel/${hmId}`, data })
        return data;
    });

export const addHotelRoom = createAsyncThunk(
    "hotelRoom/addHotelRoom",
    async (roomData) => {
        const { data } = await axios.post(`${URL}`, roomData);
        return data;
    });

export const updateHotelRoom = createAsyncThunk(
    "hotelRoom/updateHotelRoom",
    async (roomData, roomId) => {
        const { data } = await axios.patch(`${URL}/${roomId}`, roomData);
        return data;
    });

const hotelRoomSlice = createSlice({
    name: 'hotelRoom',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addHotelRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(updateHotelRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(getHotelRoomsByHotel.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(getHotelRoomByID.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
    }
})

export default hotelRoomSlice.reducer;