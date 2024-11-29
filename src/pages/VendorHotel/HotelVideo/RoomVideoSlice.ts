// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.HOTEL_ROOM_VIDEO}`;

const initialState = {
    data: [],
    isLoading: true
}

export const uploadGalleryVideo = createAsyncThunk(
    "hotelRoomVideo/uploadMultiVideo",
    async (fileData) => {
        const { data } = await axios.post(`${URL}/upload-multi-video`, fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data)
        return data;
    });

export const updateVideo = createAsyncThunk(
    "hotelRoomVideo/updateVideo",
    async (formData) => {
        const { data } = await axios.post(`${URL}/update-video`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data)
        return data;
    });

export const deleteVideo = createAsyncThunk(
    "hotelRoomVideo/deleteVideo",
    async (id) => {
        const { data } = await axios.post(`${URL}/delete-video/${id}`);
        return data;
    });

export const viewGallery = createAsyncThunk(
    "hotelRoomVideo/viewGallery",
    async (id) => {
        const { data } = await axios.post(`${URL}/view-video-gallery/${id}`);
        return data;
    });

export const viewVideoGalleryByRoom = createAsyncThunk(
    "hotelRoomVideo/viewVideoGalleryByRoom",
    async (id) => {
        const { data } = await axios.post(`${URL}/room-video-gallery/${id}`);
        return data;
    });

const hotelRoomVideoSlice = createSlice({
    name: 'hotelRoomVideo',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(viewGallery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(viewVideoGalleryByRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(uploadGalleryVideo.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteVideo.fulfilled, (state, action) => {
                state.isLoading = false;
            })
    }
})

export default hotelRoomVideoSlice.reducer;