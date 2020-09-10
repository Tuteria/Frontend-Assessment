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

const NewNote = ({ users }) => {
	const router = useRouter();
	const toast = useToast();
	const base_url = url.BASE_URL;
	function validateTitle(value) {
		let error;
		if (!value) {
			error = "Title is required";
		}
		return error;
	}

	function validateBody(value) {
		let error;
		if (!value) {
			error = "Note Body is required";
		}
		return error;
	}

	return (
		<Formik
			initialValues={{ title: "", body: "", category: "Others", username: "" }}
			onSubmit={async (values, actions) => {
				try {
					const response = await fetch(`${base_url}/notes`, {
						method: "POST",
						headers: {
							Accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(values),
					});
					actions.setSubmitting(false);
					router.push("/");
					toast({
						title: "Note Created.",
						description: "Note Created successfully",
						status: "success",
						duration: 9000,
						isClosable: true,
					});
				} catch (error) {
					console.log(error);
				}
			}}
		>
			{(props) => (
				<form onSubmit={props.handleSubmit}>
					<Stack maxWidth={600} margin="auto" spacing={5} marginTop={5}>
						<Text>Create New Post</Text>
						<Field name="title" validate={validateTitle}>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.title}>
									<Input
										{...field}
										id="title"
										placeholder="Note Title"
										variant="flushed"
									/>
									<FormErrorMessage>{form.errors.title}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Field name="username">
							{({ field, form }) => (
								<FormControl>
									<Select
										variant="flushed"
										placeholder="Select User"
										{...field}
									>
										{users.map((user) => {
											return <option>{user.username}</option>;
										})}
									</Select>
								</FormControl>
							)}
						</Field>
						<Field name="category">
							{({ field, form }) => (
								<FormControl>
									<Select
										variant="flushed"
										placeholder="Select Category"
										{...field}
									>
										<option value="others">Others</option>
										<option value="work">Work</option>
										<option value="study">Study</option>
										<option value="personal">Personal</option>
									</Select>
								</FormControl>
							)}
						</Field>

						<Field name="body" validate={validateBody}>
							{({ field, form }) => (
								<FormControl isInvalid={form.errors.body}>
									<Textarea
										{...field}
										variant="flushed"
										placeholder="Note Body"
									/>
									<FormErrorMessage>{form.errors.body}</FormErrorMessage>
								</FormControl>
							)}
						</Field>
						<Button
							mt={4}
							variantColor="teal"
							isLoading={props.isSubmitting}
							type="submit"
						>
							Create Note
						</Button>
					</Stack>
				</form>
			)}
		</Formik>
	);
};

NewNote.getInitialProps = async (ctx) => {
	const base_url = url.BASE_URL;
	const users = await fetch(`${base_url}/users`);
	const data = await users.json();

	return { users: data };
};

export default NewNote;
