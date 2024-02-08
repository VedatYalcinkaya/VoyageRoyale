export interface AddRentalRequest {
  startDate: string | null;
  endDate: string | null;
  carId: number | undefined;
  userId: number | undefined;
}
