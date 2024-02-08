export interface GetAllUsersResponse {
	id: number;
	email: string;
	password: string;
	authorities: string[];
}