import { useState } from "react";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import client from "../api/client";
import { setAuthToken } from "../libs/cookie";

const UserLogin = () => {
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onSubmit = async (user) => {
		setIsLoading(true);
		try {
			const res = await client.post("/users/login", user);
			setAuthToken(res.data.token);
			router.push(`/${res.data.user.username}`);
		} catch (err) {
			setIsLoading(false);
			setHasError(true);
		}
	};
	return (
		<LoginForm onSubmit={onSubmit} hasError={hasError} isLoading={isLoading} />
	);
};

export default UserLogin;
