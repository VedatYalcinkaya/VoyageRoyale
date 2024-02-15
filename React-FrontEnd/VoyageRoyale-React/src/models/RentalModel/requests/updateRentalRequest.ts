export interface UpdateRentalRequest {
	id: number;
	startDate: Date | null | undefined;
	endDate: Date | null | undefined;
	startKilometer: number;
	endKilometer: number;
	carId: number;
	userId: number;
}