import {createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AddCarRequest } from '../../models/CarModel/requests/addCarRequest';
import { AxiosError } from 'axios';

interface AddCarState {
  data: AddCarRequest | null;
  loading: boolean;
  error: string;
}

const initialState: AddCarState = {
  data: null,
  loading: false,
  error: "",
};

export const uploadCarImage = createAsyncThunk(
  'car/uploadImage',
  async (imageFile: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axiosInstance.post('/fileUpload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // Bu genellikle resim yolunu (URL) döndürmelidir
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

export const postCar = createAsyncThunk(
  'car/postCar',
  async (carData: AddCarRequest, { dispatch, rejectWithValue }) => {
    try {
      // Eğer imagePath zaten set edilmişse, doğrudan backend'e gönder
      if (!carData.imagePath) {
        // imagePath boşsa, burada bir hata mesajı gönderebilir veya başka bir işlem yapabilirsiniz
        return rejectWithValue('Image path is required.');
      }

      // imagePath set edilmiş, araba verilerini gönder
      const response = await axiosInstance.post('/cars/add', carData);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const addCarSlice = createSlice({
  name: 'addCar',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postCar.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(postCar.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(postCar.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "An error occurred while posting the car.";
    });
  },
});

export default addCarSlice.reducer;