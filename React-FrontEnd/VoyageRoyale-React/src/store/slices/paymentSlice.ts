import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PaymentState {
  confettiActive: boolean;
}

const initialState: PaymentState = {
  confettiActive: false,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setConfettiActive: (state, action: PayloadAction<boolean>) => {
      state.confettiActive = action.payload;
    },
  },
});

export const { setConfettiActive } = paymentSlice.actions;
export default paymentSlice.reducer;
