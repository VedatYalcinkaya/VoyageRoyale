import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CarFuelType } from "../../../models/CarFuelTypeModel/response";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface CarFuel {
  data: CarFuelType[];
  loading: boolean;
  error: string;
  fuelType:string;
}

const initialState: CarFuel = {
  data: [],
  loading: false,
  error: "",
  fuelType:"",
};

export const getCarFuelType = createAsyncThunk('getCarFuelType', async () => {
  const response = await axiosInstance.get<CarFuelType[]>('fuel_types/getAll');
  return response.data;
});

export const carFuelTypeSlice = createSlice({
  name: 'carFuelType',
  initialState,
  reducers: {
    setFueltype : (state,action:PayloadAction<string>) =>{
      state.fuelType = action.payload
    }
  }, 
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
      state.error = getCarFuelType.rejected.name;
    });
  },
});


export const {setFueltype} = carFuelTypeSlice.actions
export default carFuelTypeSlice.reducer;
