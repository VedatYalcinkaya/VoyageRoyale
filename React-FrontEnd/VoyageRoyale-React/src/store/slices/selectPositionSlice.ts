import { Position } from '../../models/LocationModel/response';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface PositionList {
    data: Position[];
    loading: boolean;
    error : string;
}

const initialState: PositionList = {
    data: [],
    loading: false,
    error: "",
}

export const getPositionList = createAsyncThunk('getPositionList', async () => {
    const response = await axios.get<Position[]>('http://localhost:8080/api/positions/getAll');
    return response.data;
  });

export const selectPositionSlice = createSlice({
    name: "PositionList",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getPositionList.pending, (state) => {
          state.loading = true;
          state.error = "";
        });
    
        builder.addCase(getPositionList.fulfilled, (state, action) => {
          state.data = action.payload;
          state.loading = false;
        });
    
        builder.addCase(getPositionList.rejected, (state) => {
          state.loading = false;
          state.error = "Error fetching user data";
        });
      },
    
})
export default selectPositionSlice.reducer;