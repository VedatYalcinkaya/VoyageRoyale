export interface GetCustomRentalResponse{
	id: number;
	userId: number;
	createdDate:string;
	startDate: string;
	endDate: string;
	startKilometer: number;
	endKilometer: number;
	carDailyPrice: number;
	carPlate: string;
	userEmail: string;
	carImagePath: string;
	carBrandName: string;
	carModelName: string;
	carPositionCity: string;
	invoicesTotalPrice: string;
}