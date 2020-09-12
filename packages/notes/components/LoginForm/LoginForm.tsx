import React, { useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/core";

export default () => {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setLoading] = useState(false);
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const url = `${process.env.API_URL}/auth/login`;
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();
			if ("message" in data) {
				throw new Error(data.message);
			}
			await router.push(`/users/${data.username}`);
		} catch (e) {
			setLoading(false);
			console.error(e.message);
		}
	};

	return (
		<Box
			mt="calc(2.5vh + 80px)"
			mx="auto"
			shadow="0 1px 5px 0 rgba(0, 0, 0, .25)"
			padding="20px"
			maxWidth="500px"
		>
			<FormControl isRequired mb="4">
				<FormLabel htmlFor="username">
					<b>Username: </b>
				</FormLabel>
				<Input id="username" value={username} onChange={handleUsernameChange} />
			</FormControl>
			<FormControl isRequired mb="4">
				<FormLabel htmlFor="password">
					<b>Password: </b>
				</FormLabel>
				<Input id="password" type="password" value={password} onChange={handlePasswordChange} />
			</FormControl>
			<Box>
				<Button
					isLoading={isLoading}
					backgroundColor="black"
					color="white"
          variant="outline"
					onClick={handleSubmit}
					width="100%"
					_hover={{ backgroundColor: "black", color: "white" }}
				>
					Login
				</Button>
			</Box>
		</Box>
	);
};
