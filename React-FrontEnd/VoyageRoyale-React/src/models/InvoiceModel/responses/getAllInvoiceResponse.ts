export interface GetAllInvoiceResponse {
	id: number;
	totalPrice: number;
	discountRate?: any;
	taxRate: number;
	rentalId: number;
	invoiceNo: string;
}