// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../../apiconfig.json";


const URL = `${api.API_URL}${api.API_ENDPOINT.HOTEL_ROOM_IMAGE}`;

const initialState = {
    data: [],
    isLoading: true
}

export const uploadGalleryImage = createAsyncThunk(
    "hotelRoomImage/uploadMultiImage",
    async (fileData) => {
        const { data } = await axios.post(`${URL}/upload-multi-image`, fileData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data)
        return data;
    });

export const updateImage = createAsyncThunk(
    "hotelRoomImage/updateImage",
    async (formData) => {
        const { data } = await axios.post(`${URL}/update-image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log(data)
        return data;
    });

export const deleteImage = createAsyncThunk(
    "hotelRoomImage/deleteImage",
    async (id) => {
        const { data } = await axios.post(`${URL}/delete-image/${id}`);
        return data;
    });

export const viewGallery = createAsyncThunk(
    "hotelRoomImage/viewGallery",
    async (id) => {
        const { data } = await axios.post(`${URL}/view-image-gallery/${id}`);
        return data;
    });

export const viewImageGalleryByRoom = createAsyncThunk(
    "hotelRoomImage/viewImageGalleryByRoom",
    async (id) => {
        const { data } = await axios.post(`${URL}/room-image-gallery/${id}`);
        return data;
    });

const hotelRoomImageSlice = createSlice({
    name: 'hotelRoomImage',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(viewGallery.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(viewImageGalleryByRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(uploadGalleryImage.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteImage.fulfilled, (state, action) => {
                state.isLoading = false;
            })
    }
})

export default hotelRoomImageSlice.reducer;