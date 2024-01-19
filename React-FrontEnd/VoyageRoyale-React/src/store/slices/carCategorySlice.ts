import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CarCategory } from "../../models/CarCategoryModel/response";

interface CarType {
  data: CarCategory[];
  loading: boolean;
  error: string;
}

const initialState: CarType = {
  data: [],
  loading: false,
  error: "",
};

export const getCarCategory = createAsyncThunk('getCarCategory', async () => {
  const response = await axios.get<CarCategory[]>('http://localhost:8080/api/carTypes/getAll');
  return response.data;
});

export const carCategorySlice = createSlice({
  name: 'carType',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(getCarCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarCategory.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getCarCategory.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching user data";
    });
  },
});

export default carCategorySlice.reducer;