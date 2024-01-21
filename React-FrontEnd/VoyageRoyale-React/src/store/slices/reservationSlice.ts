// reservationSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Rezervasyon durumunun arayüzü
interface ReservationState {
  pickUpDate: string | null;
  returnDate: string | null;
  position: string | null; // Yeni eklenen alan
}

// Başlangıç durumu
const initialState: ReservationState = {
  pickUpDate: null,
  returnDate: null,
  position: null,
};

// createSlice ile rezervasyon slice'ını oluşturma
const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    // Rezervasyon tarihlerini güncellemek için bir action
    setReservation(state, action: PayloadAction<ReservationState>) {
      const { pickUpDate, returnDate, position } = action.payload;
      state.pickUpDate = pickUpDate;
      state.returnDate = returnDate;
      state.position = position;
    },
  },
  // Eğer ekstra reducer veya asenkron işlemleriniz yoksa, bu kısım boş kalabilir
  extraReducers: (builder) => {
    // Örnek: Asenkron işlemler veya diğer slice'lardan gelen action'lar burada işlenebilir
  },
});

// Action ve reducer'ları dışa aktarma
export const { setReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
