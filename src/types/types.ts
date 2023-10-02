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
export interface ICategory {
	id: number;
	title: string;
	updatedAt: string;
	createdAt: string;
	transactions?: [];
}

export interface IResponceTransactionLoader {
	categories: ICategory[];
	transactions: ITransaction[];
	totalExpence: number;
	totalIncome: number;
}
export interface ITransaction {
	amount: number;
	id: number;
	category: ICategory;
	title: string;
	type: string;
	updatedAt: string;
	createdAt: string;
}
export interface IChart {
	totalExpence: number;
	totalIncome: number;
}
