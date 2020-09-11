import {
	FormControl,
	FormLabel,
	Input,
	Box,
	Heading,
	Flex,
	Button,
	Link,
	Text,
} from "@chakra-ui/core";
import { useState, FunctionComponent } from "react";

interface LoginFormProps {
	onSubmit?: (e: any) => void;
	header?: string;
	hasError?: boolean;
	isLoading?: boolean;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({
	onSubmit,
	header,
	hasError,
	isLoading = false,
}) => {
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
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				mt={[4, 10]}
			>
				<Link
					href="/"
					_hover={{ textDecoration: "none" }}
					_focus={{ outline: 0 }}
				>
					<Text fontSize={["3xl"]} m="2" color="#92898a">
						Notes
					</Text>
				</Link>
				<Flex
					flexDirection="column"
					bg="#fff"
					width={["95%", "55%", "40%", "25%"]}
					rounded="5px"
					padding="3"
				>
					<Heading textAlign="center" as="h4" size="lg" color="#cb3b3b">
						{header || "User Login"}
					</Heading>
					{hasError && (
						<Box mt="2" mb="2" color="#ff5959">
							Invalid Login Credentials
						</Box>
					)}
					<form onSubmit={handleSubmit}>
						<FormControl>
							<FormLabel htmlFor="username">Username</FormLabel>
							<Input
								borderColor="grey"
								onChange={handleChange}
								boxSizing="border-box"
								type="text"
								name="username"
								mb="2"
							/>
							<FormLabel htmlFor="password">Password</FormLabel>
							<Input
								borderColor="grey"
								onChange={handleChange}
								boxSizing="border-box"
								mb="2"
								type="password"
								name="password"
							/>
							<Button
								borderColor="grey"
								color="#cb3b3b"
								type="submit"
								isLoading={isLoading}
							>
								Login
							</Button>
						</FormControl>
					</form>
				</Flex>
			</Flex>
		</Box>
	);
};

export default LoginForm;
