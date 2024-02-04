export interface UpdateCarRequest {
	id: number;
	kilometer: number;
	plate: string;
	year: number;
	dailyPrice: number;
	modelId: number;
	colorId: number;
	gearTypeId: number;
	fuelTypeId: number;
	carTypeId: number;
	positionId: number;
}