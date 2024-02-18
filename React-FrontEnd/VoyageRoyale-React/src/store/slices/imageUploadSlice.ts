import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/interceptors/axiosInterceptors';
import { AxiosError } from 'axios';

interface ImageUploadState {
  loading: boolean;
  error: string;
  data: string | null;
}

const initialState: ImageUploadState = {
  loading: false,
  error: "",
  data: null,
};

export const uploadImage = createAsyncThunk(
  'imageUpload/uploadImage',
  async (imageFile: File, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axiosInstance.post('/fileUpload/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data; // This should typically return the image path (URL)
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data);
    }
  }
);

const imageUploadSlice = createSlice({
  name: 'imageUpload',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImage.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(uploadImage.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Image upload failed";
    });
  },
});

export default imageUploadSlice.reducer;