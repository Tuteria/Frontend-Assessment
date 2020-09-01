import React, { useState, useEffect } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/core";
import axios from "axios";
import { host } from "../config.json";
import Layout from "../components/Layout";
import cookies from "react-cookies";
import { useRouter } from "next/router";

export const Signup = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setloading] = useState(false);
	const [show, setshow] = useState(false);

	useEffect(() => {
		if (error) {
			setTimeout(() => {
				setError("");
			}, 7000);
		}
	}, [error]);

	async function handleSubmit(e: any) {
		e.preventDefault();
		const payload = {
			email,
			password,
			username,
		};
		setError("");
		setSuccess("");
		try {
			setloading(true);
			const res = await axios.post(`${host}/users/create`, payload);
			if (res.data) {
				setEmail("");
				setPassword("");
				setUsername("");
				setloading(false);
				cookies.save("currentUser", res.data);
				cookies.save("authToken", res.data.token);
				setSuccess("Sign Up successful!");
				router.push(`/notes/${res.data.username}`);
				return;
			}
			setloading(false);
		} catch (error) {
			console.log(error.message);
			setloading(false);
			setError("an Error occurred, check your internet connection");
		}
	}
	return (
		<Layout>
			<form onSubmit={handleSubmit}>
				<br />
				<FormControl isRequired>
					<h3 style={{ color: "red" }}>{error}</h3>
					<h3 style={{ color: "green" }}>{success}</h3>
					<FormLabel htmlFor="email">Email address</FormLabel>
					<br />
					<Input
						type="email"
						id="email"
						value={email}
						placeholder="Enter Your Email"
						onChange={(e: any) => {
							setEmail(e.target.value);
						}}
					/>
					<FormLabel htmlFor="username">Username</FormLabel>
					<br />
					<Input
						type="text"
						id="username"
						value={username}
						placeholder="Enter Your Username"
						onChange={(e: any) => {
							setUsername(e.target.value);
						}}
					/>
					<FormLabel htmlFor="password">Password</FormLabel>
					<InputGroup size="md">
						<Input
							pr="4.5rem"
							type={show ? "text" : "password"}
							id="password"
							value={password}
							placeholder="Enter Password"
							onChange={(e: any) => {
								setPassword(e.target.value);
							}}
						/>
						<InputRightElement width="4.5rem">
							<Button
								h="1.75rem"
								size="sm"
								onClick={() => {
									setshow(!show);
								}}
							>
								{show ? "Hide" : "Show"}
							</Button>
						</InputRightElement>
					</InputGroup>
				</FormControl>
				<br />
				<Button
					isDisabled={loading}
					variantColor="purple"
					type="submit"
					isLoading={loading}
				>
					Submit
				</Button>
			</form>
			<style jsx>{`
				form {
					margin: auto;
					width: 80%;
				}
				@media only screen and (min-width: 700px) {
					form {
						margin: auto;
						width: 60%;
					}
				}
			`}</style>
		</Layout>
	);
};

export default Signup;
