import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface CarBrand {
  data: CarBrandType[];
  loading: boolean;
  error: string;
  brandType:string;
}

const initialState: CarBrand = {
  data: [],
  loading: false,
  error: "",
  brandType:"",
};

export const getCarBrandType = createAsyncThunk('getCarBrandType', async () => {
  const response = await axiosInstance.get<CarBrandType[]>('brands/getAll');
  return response.data;
});

export const carBrandTypeSlice = createSlice({
  name: 'carBrandType',
  initialState,
  reducers: {
    setBrandType : (state,action:PayloadAction<string>) =>{
      state.brandType = action.payload
    }
  }, 
  extraReducers: (builder) => {
    builder.addCase(getCarBrandType.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarBrandType.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getCarBrandType.rejected, (state) => {
      state.loading = false;
      state.error = getCarBrandType.rejected.name;
    });
  },
});


export const {setBrandType} = carBrandTypeSlice.actions
export default carBrandTypeSlice.reducer;
