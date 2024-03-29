import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UserRequest } from '../../models/UserModel/requests/request';
import axios from 'axios';

interface SignUp {
  data: UserRequest | null;
  loading: boolean;
  error: string;
}

const initialState: SignUp = {
  data: null,
  loading: false,
  error: "",
};

export const postSignUp = createAsyncThunk('postSignUp', async (userRequest: UserRequest) => {
  try {
    const response = await axios.post("http://localhost:8080/api/auth/customerRegister", userRequest);
    return response.data; 
  } catch (error) {
    throw error;
  }
});

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postSignUp.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(postSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('Sign-up request successful!'); // Log the success
      })
      .addCase(postSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default signUpSlice.reducer;
