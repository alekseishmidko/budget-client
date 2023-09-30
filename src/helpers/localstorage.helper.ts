export const getTokenFromLS = (): string => {
	const tokenData = localStorage.getItem("token");
	const token: string = tokenData ? JSON.parse(tokenData) : "";
	return token;
};
export const setTokenToLS = (key: string, token: string): void => {
	localStorage.setItem(key, JSON.stringify(token));
};
export const removeTokenFromLS = (key: string): void => {
	localStorage.removeItem(key);
};
