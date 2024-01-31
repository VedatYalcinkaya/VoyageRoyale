export interface AddCarRequest{
	kilometer: number;  // input number
	plate: string;      //input string
	year: number;       // input number
	dailyPrice: number; // input number
	modelId: number;    // veri çekilecek
	colorId: number;    //veri çekilecek
	gearTypeId: number; //hazır
	fuelTypeId: number; // hazır
	carTypeId: number; // hazır
	positionId: number; // hazır
}