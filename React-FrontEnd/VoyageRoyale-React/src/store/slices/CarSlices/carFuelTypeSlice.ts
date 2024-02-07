import { CarFuelType } from './../../../models/CarFuelTypeModel/responses/response';
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";

interface CarFuel {
  data: CarFuelType[];
  loading: boolean;
  error: string;
  fuelType:string;
  fuelId:number;
}

const initialState: CarFuel = {
  data: [],
  loading: false,
  error: "",
  fuelType:"",
  fuelId:0
};

export const getCarFuelType = createAsyncThunk('getCarFuelType', async () => {
  const response = await axiosInstance.get<CarFuelType[]>('fuel_types/getAll');
  return response.data;
});

export const carFuelTypeSlice = createSlice({
  name: 'carFuelType',
  initialState,
  reducers: {
    setFuelType : (state,action:PayloadAction<string>) =>{
      state.fuelType = action.payload
    },
    setFuelId : (state,action:PayloadAction<number>) =>{
      state.fuelId = action.payload
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


export const {setFuelType,setFuelId} = carFuelTypeSlice.actions
export default carFuelTypeSlice.reducer;
