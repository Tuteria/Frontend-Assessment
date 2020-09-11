import { useState, useContext } from "react";
import { useRouter } from "next/router";

import LoginForm from "../../components/LoginForm";
import client from "../../api/client";
import { setAuthToken } from "../../libs/cookie";
import { storeContext } from "../../store";

const AdminLogin = () => {
	const { handleLogin } = useContext(storeContext);
	const [hasError, setHasError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onSubmit = async (user) => {
		setIsLoading(true);
		try {
			const res = await client.post("/users/admin/login", user);
			setAuthToken(res.data.token);
			handleLogin(res.data.user);
			router.push(`/admin`);
		} catch (err) {
			setHasError(true);
			setIsLoading(false);
		}
	};

	return (
		<LoginForm
			onSubmit={onSubmit}
			hasError={hasError}
			isLoading={isLoading}
			header="Admin Login"
		/>
	);
};

export default AdminLogin;
