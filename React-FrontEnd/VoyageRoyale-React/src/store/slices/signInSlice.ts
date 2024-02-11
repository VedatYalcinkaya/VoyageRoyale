import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { signInRequest } from '../../models/UserModel/requests/signInRequest';

interface SignIn {
  data: signInRequest | null;
  loading: boolean;
  error: string;
  setSignedIn: boolean;
}

const initialState: SignIn = {
  data: null,
  loading: false,
  error: "",
  setSignedIn: localStorage.getItem("isSignedIn") === "true" ||false
};

export const postSignIn = createAsyncThunk('postSignIn', async (signInRequest: signInRequest) => {
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
    isSignedIn(state,action){
      state.setSignedIn = action.payload;
        localStorage.setItem("isSignedIn", action.payload);
    }
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


export const { isSignedIn } = signInSlice.actions;
export default signInSlice.reducer;
