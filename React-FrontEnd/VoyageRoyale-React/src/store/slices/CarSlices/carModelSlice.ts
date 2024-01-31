import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { GetAllModelResponse } from "../../../models/ModelModel/responses/getAllModelResponse";

interface CarModel{
    data:GetAllModelResponse[];
    loading : boolean;
    error:string;
}

const initialState:CarModel ={
    data:[],
    loading:false,
    error:"",
}

export const getAllModel = createAsyncThunk('getAllModel', async()=>{
    const response = await axiosInstance.get<GetAllModelResponse[]>('models/getAll');
    return response.data;
});

export const carModelSlice = createSlice({
    name:'carModel',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getAllModel.pending, (state)=> {
            state.loading = true;
            state.error="";
        });
        builder.addCase(getAllModel.fulfilled, (state,action) => {
            state.data = action.payload;
            state.loading = false;
        });
        builder.addCase(getAllModel.rejected, (state)=> {
            state.loading=false;
            state.error = "Error fetching data";
        })
    }

});


export default carModelSlice.reducer;