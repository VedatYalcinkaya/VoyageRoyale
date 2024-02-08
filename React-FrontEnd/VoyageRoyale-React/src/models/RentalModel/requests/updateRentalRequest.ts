export interface UpdateRentalRequest {
  id: number;
  startDate: string;
  endDate: string;
  returnDate: string;
  startKilometer: number;
  endKilometer: number;
  carId: number;
  userId: number;
}
