import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { CarCarType } from "../../../models/CarCarTypeModel/responses/response";

interface CarCarTypeState {
  data: CarCarType[];
  loading: boolean;
  error: string;
  carType: string[];
  carTypeId: number;
}

const initialState: CarCarTypeState = {
  data: [],
  loading: false,
  error: "",
  carType: [],
  carTypeId:0
};

export const getCarCarType = createAsyncThunk('getCarCarType', async () => {
  const response = await axiosInstance.get<CarCarType[]>('carTypes/getAll');
  return response.data;
});

export const carCarTypeSlice = createSlice({
  name: 'carCarType',
  initialState,
  reducers: {
    setCarCarType: (state, action: PayloadAction<string[]>) => {
      state.carType = action.payload
    },
    setCarTypeId: (state, action: PayloadAction<number>) => {
      state.carTypeId = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCarCarType.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarCarType.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getCarCarType.rejected, (state) => {
      state.loading = false;
      state.error = "Error fetching user data";
    });
  },
});

export const { setCarCarType, setCarTypeId } = carCarTypeSlice.actions;
export default carCarTypeSlice.reducer;
