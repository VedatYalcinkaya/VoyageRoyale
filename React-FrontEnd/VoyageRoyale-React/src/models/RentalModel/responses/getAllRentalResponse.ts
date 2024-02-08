export interface GetAllRentalResponse {
  id: number | undefined;
  startDate: string | null;
  endDate: string | null;
  returnDate: string | null;
  startKilometer: number | undefined;
  endKilometer: number | undefined;
  totalPrice: number | undefined;
  carId: number | undefined;
  userId: number | undefined;
}
