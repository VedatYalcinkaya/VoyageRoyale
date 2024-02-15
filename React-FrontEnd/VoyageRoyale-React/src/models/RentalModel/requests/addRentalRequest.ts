export interface AddRentalRequest {
  startDate: Date | null | undefined;
  endDate: Date | null | undefined;
  carId: number | undefined;
  userId: number | undefined;
}
