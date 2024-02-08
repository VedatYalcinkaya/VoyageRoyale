import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptors/axiosInterceptors";
import { GetAllUsersResponse } from "../../models/UserModel/responses/getAllUsersResponse";

interface GetAllUsers {
  data: GetAllUsersResponse[] | null;

}

const initialState: GetAllUsers = {
  data: null,
 
};

export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
  const response = await axiosInstance.get<GetAllUsersResponse[]>(
    `/users/getAll`
  );
  return response.data;
});

const getAllUsersSlice = createSlice({
  name: "getAllRentals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.data = action.payload;
      })
    
  },
});

export default getAllUsersSlice.reducer;
