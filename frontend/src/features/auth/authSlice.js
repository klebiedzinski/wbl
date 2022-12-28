import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService.js';

// get user from local storage
const user = JSON.parse(localStorage.getItem('user'));


const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// register user
export const registerUser = createAsyncThunk('auth/registerUser',
    async (user, thunkAPI) => {
        try {
            return await authService.registerUser(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)



export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
        }
    },
    extraReducers: () => {}
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;
