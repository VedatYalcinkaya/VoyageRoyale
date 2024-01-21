import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CarCategory } from "../../../models/CarCategoryModel/response";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface CarType {
  data: CarCategory[];
  loading: boolean;
  error: string;
  carType:string;
}

const initialState: CarType = {
  data: [],
  loading: false,
  error: "",
  carType:""
};

export const getCarCategory = createAsyncThunk('getCarCategory', async () => {
  const response = await axiosInstance.get<CarCategory[]>('carTypes/getAll');
  return response.data;
});

export const carCategorySlice = createSlice({
  name: 'carType',
  initialState,
  reducers: {
    setCarType:(state,action:PayloadAction<string>)=>{
      state.carType = action.payload
    }
  }, 
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


export const { setCarType } = carCategorySlice.actions;
export default carCategorySlice.reducer;