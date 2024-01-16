import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { Car } from "../../models/CarModel/response"

interface CarList{
    data:Car[],
    loading:boolean,
    error:string
    
}


const initialState : CarList  = {
    data: [],
    loading:false,
    error:"",
    
}

export const getCarList = createAsyncThunk('getCarList', async () => {
    const response = await axios.get<Car>('http://localhost:8080/api/cars/getAll')
    return response.data
})

export const carListSlice=createSlice({
    name:'carList',
    initialState,
    reducers: {

    },
    extraReducers : (builder) => {
        builder.addCase(getCarList.pending,(state,action)=> {
            state.loading = true,
            state.error =""
        })

        builder.addCase(getCarList.fulfilled, (state, action: PayloadAction<Car>) => {
            state.data.push(action.payload)
        })

        builder.addCase(getCarList.rejected,(state,action)=> {
            state.loading = false,
            state.error ="Error fetching user data"
        })
    } 
})


export default carListSlice.reducer;
