import { useState, useContext } from "react";
import { useRouter } from "next/router";

import LoginForm from "../components/LoginForm";
import client from "../api/client";
import { setAuthToken } from "../libs/cookie";
import { storeContext } from "../store";

const UserLogin = () => {
	const { handleLogin } = useContext(storeContext);
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onSubmit = async (user: NoteUser) => {
		setIsLoading(true);
		try {
			const res = await client.post("/users/login", user);
			setAuthToken(res.data.token);
			handleLogin(res.data.user);
			router.push("/[username]", `/${res.data.user.username}`, {
				shallow: true,
			});
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
