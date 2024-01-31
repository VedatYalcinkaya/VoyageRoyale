import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { CarBrandType } from "../../../models/CarBrandModel/responses/response";

interface CarBrand {
  data: CarBrandType[];
  loading: boolean;
  error: string;
  brandType:string;
  brandId:number;
}

const initialState: CarBrand = {
  data: [],
  loading: false,
  error: "",
  brandType:"",
  brandId:0
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
    },
    setBrandId : (state,action:PayloadAction<number>) =>{
      state.brandId = action.payload
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


export const {setBrandType,setBrandId} = carBrandTypeSlice.actions
export default carBrandTypeSlice.reducer;
