export interface AddCarRequest {
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
	imageFile?: File;
	imagePath?: string; // Sunucudan dönen resim yolunu tutar
  }
  