import {
	FormControl,
	FormLabel,
	Input,
	Box,
	Heading,
	Flex,
	Button,
} from "@chakra-ui/core";
import { useState } from "react";

interface LoginFormProps {
	onSubmit?: (e: any) => any;
	header?: string;
	error?: string;
}

export default ({ onSubmit, header, error }: LoginFormProps) => {
	const [user, setUser] = useState({});
	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit(user);
	};
	return (
		<Box>
			<Flex
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				mt={[2, 4, 10]}
			>
				<Heading as="h4" size="lg" color="#cb3b3b">
					{header || "User Login"}
				</Heading>
				{error && (
					<Box mt="2" mb="2" color="#ff5959">
						Invalid Login Credentials
					</Box>
				)}
				<form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel htmlFor="username">Username</FormLabel>
						<Input onChange={handleChange} type="text" name="username" mb="2" />
						<FormLabel htmlFor="password">Password</FormLabel>
						<Input
							onChange={handleChange}
							mb="2"
							type="password"
							name="password"
						/>
						<Button type="submit">Login</Button>
					</FormControl>
				</form>
			</Flex>
		</Box>
	);
};
