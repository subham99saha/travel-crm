// @ts-nocheck
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../../apiconfig.json";


const URL = `${api.API_URL}`;

const initialState = {
    data: [],
    isLoading: true
}

export const userLogin = createAsyncThunk(
    "login/userLogin",
    async (loginData) => {
        const { data } = await axios.post(`${URL}${api.API_ENDPOINT.SUPER_USER}/${api.API_ENDPOINT.LOGIN}`, loginData);
        console.log(data);
        return data;
    });

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                localStorage.setItem('userInfo', JSON.stringify(action.payload))
                state.isLoading = false;
                state.data = action.payload
            })
            .addCase(userLogin.rejected, (state, action) => {
                console.log(action.error)
                console.log(state)
                state.isLoading = false;
                state.data = []
            })
    }
})

export default loginSlice.reducer;