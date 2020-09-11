import jwt from "jsonwebtoken";
import Cookie from "js-cookie";

const X_TOKEN_KEY_NAME = "34dkkkjk#dfksfsdksdkfsjk";

export function getAuthToken() {
	return Cookie.get(X_TOKEN_KEY_NAME);
}

export const setAuthToken = (token: string) => {
	Cookie.set(X_TOKEN_KEY_NAME, token);
};

export const removeAuthToken = () => {
	Cookie.remove(X_TOKEN_KEY_NAME);
};

export const getUserfromCookie = () => {
	const token = getAuthToken();
	if (!token) {
		return null;
	}
	try {
		const decoded = jwt.decode(token);
		return decoded["user"];
	} catch (err) {
		return null;
	}
};
