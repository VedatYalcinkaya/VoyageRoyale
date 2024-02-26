interface User {
	id: number;
	createdDate?: any;
	updatedDate?: any;
	email: string;
	password: string;
	authorities: string[];
	userImagePath: string;
	tokens?: any;
	enabled: boolean;
	username: string;
	accountNonExpired: boolean;
	credentialsNonExpired: boolean;
	accountNonLocked: boolean;
}

export interface GetCredentialsResponse {
	token: string;
	refreshToken: string;
	roles: string[];
	user: User;
}