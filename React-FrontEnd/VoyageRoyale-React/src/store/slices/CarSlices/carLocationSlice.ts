import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { Position } from "../../../models/LocationModel/responses/response";
import { RootState } from "../../configureStore";

interface CarLocation {
  data: Position[];
  loading: boolean;
  error: string;
  selectedLocationId: number;
}

const initialState: CarLocation = {
  data: [],
  loading: false,
  error: "",
  selectedLocationId: 0,
};

export const selectLocations = (state: RootState) => state.carLocation.data;
export const getCarLocations = createAsyncThunk("getCarLocations", async () => {
  const response = await axiosInstance.get<Position[]>("positions/getAll");
  return response.data;
});

export const carLocationSlice = createSlice({
  name: "carLocation",
  initialState,
  reducers: {
    setSelectedCarLocationId: (state, action: PayloadAction<number>) => {
      state.selectedLocationId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCarLocations.pending, (state) => {
      state.loading = true;
      state.error = "";
    });

    builder.addCase(getCarLocations.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });

    builder.addCase(getCarLocations.rejected, (state, action) => {
      state.loading = false;
      state.error = `Failed to fetch car locations: ${action.error.message}`;
    });
  },
});

export const { setSelectedCarLocationId } = carLocationSlice.actions;
export default carLocationSlice.reducer;
