import nookies, { destroyCookie } from "nookies";

export const logout = async ({ res }) => {
	destroyCookie(null, "sbsToken", {
		path: "/", // THE KEY IS TO SET THE SAME PATH
	});
	return { ok: true };
};
