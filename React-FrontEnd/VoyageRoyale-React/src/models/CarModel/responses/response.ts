export interface Car {
	id: number;
	kilometer: number;
	plate: string;
	year: number;
	dailyPrice: number;
	modelName: string;
	colorName: string;
	brandName: string;
	imagePath: string;
	gearTypeName?: string;
	fuelTypeName?: string;
	carTypeName?: string;
	positionName?: string;
	brandLogoPath?: string;
}