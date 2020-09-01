import React, { useState, useEffect } from "react";
import {
	FormControl,
	FormLabel,
	Input,
	Button,
	InputGroup,
	InputRightElement,
} from "@chakra-ui/core";
import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { adminToken } from "../../config.json";
import cookies from "react-cookies";

export const AdminLogin = () => {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [success, setSuccess] = useState("");
	const [error, setError] = useState("");
	const [loading, setloading] = useState(false);
	const [show, setshow] = useState(false);

	async function handleSubmit(e: any) {
		e.preventDefault();

		setError("");
		setSuccess("");

		try {
			setloading(true);
			if (email === "admin@mail.com" && password === "admintuteria") {
				cookies.save("isAdmin", true);
				cookies.save("isAdminToken", adminToken);
				setEmail("");
				setPassword("");
				setloading(false);
				setSuccess("login successful!");
				router.push("/admin");
				return;
			}
			setloading(false);
			setError("wrong credentials");
		} catch (error) {
			console.log(error.message);
			setloading(false);
		}
	}
	return (
		<Layout>
			<form onSubmit={handleSubmit}>
				<br />
				<h1>Admin Login</h1>
				<div className="details-container">
					<p>
						Email: <strong>admin@mail.com</strong>
					</p>
					<p>
						Password <strong>admintuteria</strong>
					</p>
				</div>
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
				.details-container {
					margin-bottom: 1rem;
				}
				h1 {
					font-size: 2rem;
					font-weight: bold;
					margin-bottom: 1rem;
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

export default AdminLogin;
