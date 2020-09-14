import Cookie from "js-cookie";
import jwt from "jsonwebtoken";


export const setAuthToken = (token: string) => {
	Cookie.set('TOKEN_COOKIE', token);
};

export const saveUserData = (username, isAdmin) => {
	Cookie.set('USERNAME_COOKIE', username);
	if(isAdmin) Cookie.set('ADMIN_COOKIE', isAdmin);
}

export function getAuthToken() {
	return Cookie.get('TOKEN_COOKIE');
}

export const removeAuthToken = () => {
	Cookie.remove('TOKEN_COOKIE');
	Cookie.remove('USERNAME_COOKIE');
	Cookie.remove('ADMIN_COOKIE');
};

export const decodeToken = (token: string) => {

	const decoded = jwt.decode(token);
	return decoded
};

export default AuthContext;
