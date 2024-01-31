import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { GetAllColorResponse } from "../../../models/ColorModel/responses/getAllColorResponse";

interface CarColor{
    data:GetAllColorResponse[];
    loading : boolean;
    error:string;
}

const initialState:CarColor ={
    data:[],
    loading:false,
    error:"",
}

export const getAllColor = createAsyncThunk('getAllColor', async()=>{
    const response = await axiosInstance.get<GetAllColorResponse[]>('colors/getAll');
    return response.data;
});

export const carColorSlice = createSlice({
    name:'carColor',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllColor.pending, (state)=> {
            state.loading = true;
            state.error="";
        });
        builder.addCase(getAllColor.fulfilled, (state,action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getAllColor.rejected, (state)=> {
            state.loading=false;
            state.error = "Error fetching data";
        })
    }

});


export default carColorSlice.reducer;