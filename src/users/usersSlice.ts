import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../stores/store";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = {
    users: [],
    loading: false,
    error: null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    // const response = await axios.get(USERS_URL);
    // //console.log("FetchUser: ",response)
    // return response.data

    return fetch("https://jsonplaceholder.typicode.com/users").then((res)=>{
        return res.json();
    })
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        // builder.addCase(fetchUsers.fulfilled, (state, action) => {
        //     return action.payload;
        // })
        builder.addCase(fetchUsers.pending, (state) => {
            state.loading = true
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            //console.log('payload', action.payload) //undefined
        })
        .addCase(fetchUsers.rejected, (state) => {
            state.loading = false;
            //state.error = "error in api";
            state.users = [];
        })
    }
})

export const selectAllUsers = (state: any) => state.users;

export default usersSlice.reducer