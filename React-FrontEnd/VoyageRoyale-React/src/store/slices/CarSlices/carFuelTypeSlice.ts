import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { CarFuelType } from "../../../models/CarFuelTypeModel/responses/response";

interface FuelType{
    data:CarFuelType[];
    loading : boolean;
    error:string;
    fuelType:string;
}

const initialState:FuelType ={
    data:[],
    loading:false,
    error:"",
    fuelType:""
}

export const getCarFuelType = createAsyncThunk('getCarFuelType', async()=>{
    const response = await axiosInstance.get<CarFuelType[]>('fuel_types/getAll');
    return response.data;
});

export const carFuelTypeSlice = createSlice({
    name:'carFuelType',
    initialState,
    reducers:{
        setFuelType:(state,action:PayloadAction<string>) =>{
            state.fuelType = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getCarFuelType.pending, (state)=> {
            state.loading = true;
            state.error="";
        });
        builder.addCase(getCarFuelType.fulfilled, (state,action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getCarFuelType.rejected, (state)=> {
            state.loading=false;
            state.error = "Error fetching data";
        })
    }

});

export const {setFuelType} = carFuelTypeSlice.actions;
export default carFuelTypeSlice.reducer;