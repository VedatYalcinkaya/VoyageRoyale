export interface UpdateCustomerPanelRequest {
	id: number;
	firstName: string;
	lastName: string;
	userId: number;
	tcNo: string;
	birthDate: number | undefined;
}