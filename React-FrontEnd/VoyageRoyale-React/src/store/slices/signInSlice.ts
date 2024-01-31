import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { signInRequest } from '../../models/UserModel/signInRequest';

interface SignIn {
  data: signInRequest | null;
  loading: boolean;
  error: string;
}

const initialState: SignIn = {
  data: null,
  loading: false,
  error: "",
};

export const postSignIn = createAsyncThunk('postSignUp', async (signInRequest: signInRequest) => {
  try {
    const response = await axiosInstance.post('/auth/authenticate', signInRequest);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSignIn.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postSignIn.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(postSignIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default signInSlice.reducer;
