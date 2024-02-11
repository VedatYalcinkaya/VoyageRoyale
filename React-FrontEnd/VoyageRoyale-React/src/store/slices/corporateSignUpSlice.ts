import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { CorporateSignUpRequest } from '../../models/UserModel/requests/corporateSignUpRequest';

interface CorporateSignUp {
  data: CorporateSignUpRequest | null;
}

const initialState: CorporateSignUp = {
  data: null
};

export const postCorporateSignUp = createAsyncThunk('postCorporateSignUp', async (corporateUserRequest: CorporateSignUpRequest) => {
    const response = await axiosInstance.post('/auth/corporateRegister', corporateUserRequest);
    return response.data; 
 
});

const corporateSignUpSlice = createSlice({
  name: 'corporateSignUp',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCorporateSignUp.fulfilled, (state, action) => {
        state.data = action.payload
      })
  },
});

export default corporateSignUpSlice.reducer;
