// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}`;

const initialState = {
    data: [],
    isLoading: true
}

export const verifyUserLogin = createAsyncThunk(
    "login/verifyUserLogin",
    async () => {
        const { data } = await axios.post(`${URL}${api.API_ENDPOINT.SUPER_USER}/${api.API_ENDPOINT.VERIFY_LOGIN}`, { token: JSON.parse(localStorage.getItem('userInfo')).token });
        console.log(data);
        return data;
    });

const verifyLoginSlice = createSlice({
    name: 'verifyLogin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyUserLogin.fulfilled, (state, action) => {
                console.log(action.payload)
                state.isLoading = false;
                state.data = action.payload
            })
    }
})

export default verifyLoginSlice.reducer;