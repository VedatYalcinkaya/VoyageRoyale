export interface GetCustomRentalResponse{
	id: number;
	startDate: string;
	endDate: string;
	startKilometer: number;
	endKilometer: number;
	carDailyPrice: number;
	carPlate: string;
	userEmail: string;
}