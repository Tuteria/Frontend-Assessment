import fetch from "isomorphic-unfetch";
import { Formik, Field } from "formik";
import {
	Button,
	Stack,
	FormControl,
	FormLabel,
	Input,
	Text,
	Textarea,
	Select,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import url from "../../src/appEnv";

const Register = () => {
	const router = useRouter();
	const toast = useToast();
	function validateUsername(value) {
		let error;
		if (!value) {
			error = "Username is required";
		}
		return error;
	}

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
			initialValues={{ username: "", email: "", password: "" }}
			onSubmit={async (values, actions) => {
				try {
					const response = await fetch(`${url.BASE_URL}/users`, {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(values),
					});
					actions.setSubmitting(false);
					router.push("/admin");
					toast({
						title: "User Created.",
						description: "User Created successfully",
						status: "success",
						duration: 9000,
						isClosable: true,
					});
					console.log(values);
				} catch (error) {
					console.log(error);
				}
			}}
		>
			{(props) => (
				<form onSubmit={props.handleSubmit}>
					<Stack maxWidth={600} margin="auto" spacing={5} marginTop={5}>
						<Text>Register New User</Text>
						<Field name="username" validate={validateUsername}>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.username}>
									<Input
										{...field}
										id="username"
										placeholder="Username"
										variant="flushed"
									/>
									<FormErrorMessage>{form.errors.username}</FormErrorMessage>
								</FormControl>
							)}
						</Field>

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
							Register User
						</Button>
					</Stack>
				</form>
			)}
		</Formik>
	);
};

export default Register;
