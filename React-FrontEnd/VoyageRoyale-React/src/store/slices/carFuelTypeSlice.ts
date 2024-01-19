import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CarFuelType } from "../../models/CarFuelTypeModel/response";

interface CarFuel {
  data: CarFuelType[];
  loading: boolean;
  error: string;
}

const initialState: CarFuel = {
  data: [],
  loading: false,
  error: "",
};

export const getCarFuelType = createAsyncThunk('getCarCategory', async () => {
  const response = await axios.get<CarFuelType[]>('http://localhost:8080/api/fuel_types/getAll');
  return response.data;
});

export const carCategorySlice = createSlice({
  name: 'carFuelType',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder.addCase(getCarFuelType.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarFuelType.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getCarFuelType.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching user data";
    });
  },
});

export default carCategorySlice.reducer;
