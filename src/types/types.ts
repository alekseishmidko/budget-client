export interface IUserData {
	email: string;
	password: string;
}
export interface IUser {
	id: number;
	email: string;
	token: string;
}
export interface IresponseUser {
	createdAt: string | undefined;
	updatedAt: string | undefined;
	email: string | undefined;
	password: string | undefined;
	id: number | undefined;
}
export interface IResponceUserData {
	token: string;
	user: IresponseUser | undefined;
}
