import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { CarGearType } from "../../../models/CarGearTypeModel/responses/response";

interface GearType{
    data:CarGearType[];
    loading : boolean;
    error:string;
    gearType:string;
}

const initialState:GearType ={
    data:[],
    loading:false,
    error:"",
    gearType:""
}

export const getCarGearType = createAsyncThunk('getCarGearType', async()=>{
    const response = await axiosInstance.get<CarGearType[]>('gear_types/getAll');
    return response.data;
});

export const carGearTypeSlice = createSlice({
    name:'carGearType',
    initialState,
    reducers:{
        setGearType:(state,action:PayloadAction<string>) =>{
            state.gearType = action.payload
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getCarGearType.pending, (state)=> {
            state.loading = true;
            state.error="";
        });
        builder.addCase(getCarGearType.fulfilled, (state,action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getCarGearType.rejected, (state)=> {
            state.loading=false;
            state.error = "Error fetching data";
        })
    }

});

export const {setGearType} = carGearTypeSlice.actions;
export default carGearTypeSlice.reducer;