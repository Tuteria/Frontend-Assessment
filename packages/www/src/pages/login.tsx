import { useState } from "react";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import client from "../api/client";
import { setAuthToken } from "../libs/cookie";

export default () => {
	const [apiError, setApiError] = useState(null);
	const router = useRouter();

	const onSubmit = async (user) => {
		try {
			const res = await client.post("/users/login", user);
			setAuthToken(res.data.token);
			router.push(`/${res.data.user.username}`);
		} catch (err) {
			if (err?.response?.status >= 400) {
				setApiError(err.response.data.message);
			}
		}
	};
	return <LoginForm onSubmit={onSubmit} error={apiError} />;
};
