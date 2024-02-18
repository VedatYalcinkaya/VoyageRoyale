import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { UpdateCarRequest } from '../../models/CarModel/requests/updateCarRequest';
import { uploadCarImage } from './addCarSlice';
import { AxiosError } from 'axios';


interface UpdateCar {
  data: UpdateCarRequest | null;
  loading: boolean;
  error: string;
  imageUpload: {
    loading: boolean;
    error: string;
    data: string | null;
  };
}

const initialState: UpdateCar = {
  data: null,
  loading: false,
  error: "",
  imageUpload: {
    loading: false,
    error: "",
    data: null,
  },
};
export const updateCar = createAsyncThunk(
  'car/updateCar',
  async (carData: UpdateCarRequest, { dispatch, rejectWithValue }) => {
    if (carData.imagePath && carData.imageFile) {
      try {
        const uploadResult = await dispatch(uploadCarImage(carData.imageFile)).unwrap();
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
      .addCase(uploadCarImage.fulfilled, (state, action) => {
        state.imageUpload.loading = false;
        state.imageUpload.data = action.payload;
      })
      .addCase(uploadCarImage.pending, (state) => {
        state.imageUpload.loading = true;
        state.imageUpload.error = "";
      })
      .addCase(uploadCarImage.rejected, (state, action) => {
        state.imageUpload.loading = false;
        state.imageUpload.error = action.error.message || "Failed to upload image.";
      })

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