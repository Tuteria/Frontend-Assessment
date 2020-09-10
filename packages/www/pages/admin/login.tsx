import fetch from "isomorphic-unfetch";
import { Formik, Field } from "formik";
import {
	Button,
	Stack,
	FormControl,
	Input,
	Text,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import url from "../../src/appEnv";
import jwt from "jsonwebtoken";
import { adminToken } from "../../src/appEnv";

const Login = () => {
	const router = useRouter();
	const toast = useToast();

	function validateEmail(value) {
		let error;
		if (!value) {
			error = "Email is required";
		}
		return error;
	}

	function validatePassword(value) {
		let error;
		if (!value) {
			error = "Password is required";
		}
		return error;
	}

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			onSubmit={async (values, actions) => {
				try {
					const response = await fetch(`${url.BASE_URL}/users/login`, {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(values),
					});
					const data = await response.json();
					const message = data.message;
					const token = data.token;
					jwt.verify(token, adminToken.SECRET, function (err, decoded) {
						if (err) {
							toast({
								title: "User Login Failed.",
								description: "Invalid Email or password",
								status: "error",
								duration: 9000,
								isClosable: true,
							});
						} else {
							actions.setSubmitting(false);
							router.push("/admin");
							toast({
								title: "User Login.",
								description: "User Logged in successfully",
								status: "success",
								duration: 9000,
								isClosable: true,
							});
						}
					});
				} catch (error) {
					console.log(error);
				}
			}}
		>
			{(props) => (
				<form onSubmit={props.handleSubmit}>
					<Stack maxWidth={400} margin="auto" spacing={5} marginTop={5}>
						<Text>Login</Text>

						<Field name="email" validate={validateEmail}>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.email}>
									<Input
										{...field}
										id="email"
										placeholder="Email"
										variant="flushed"
										type="email"
									/>
									<FormErrorMessage>{form.errors.email}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Field name="password" validate={validatePassword}>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.password}>
									<Input
										{...field}
										id="password"
										placeholder="password"
										variant="flushed"
										type="password"
									/>
									<FormErrorMessage>{form.errors.password}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

						<Button
							mt={4}
							variantColor="teal"
							isLoading={props.isSubmitting}
							type="submit"
						>
							Login User
						</Button>
					</Stack>
				</form>
			)}
		</Formik>
	);
};

export default Login;
