import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateCarRequest } from '../../models/CarModel/requests/updateCarRequest';
import { AxiosError } from 'axios';
import { uploadImage } from './imageUploadSlice';


interface UpdateCar {
  data: UpdateCarRequest | null;
  loading: boolean;
  error: string;
}

const initialState: UpdateCar = {
  data: null,
  loading: false,
  error: "",
};
export const updateCar = createAsyncThunk(
  'car/updateCar',
  async (carData: UpdateCarRequest, { dispatch, rejectWithValue }) => {
    if (carData.imagePath && carData.imageFile) {
      try {
        const uploadResult = await dispatch(uploadImage(carData.imageFile)).unwrap();
        carData.imagePath = uploadResult; // uploadResult URL'yi dönmeli
      } catch (error) {
        return rejectWithValue('Resim yüklenirken bir hata oluştu');
      }
    }

    try {
      const response = await axiosInstance.put('/cars/update', {
        ...carData,
        imageFile: undefined, // imageFile'ı göndermek istemiyoruz
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);


const updateCarSlice = createSlice({
  name: 'updateCar',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateCar.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });


  },
});

export default updateCarSlice.reducer;