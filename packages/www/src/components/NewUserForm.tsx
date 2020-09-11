import { FormControl, Input, Flex, Button, Text } from "@chakra-ui/core";
import { useState, useContext } from "react";

import { storeContext, setUserView, USER_LIST_VIEW } from "../store";
import client from "../api/client";

const NewUserForm = () => {
	const { dispatch } = useContext(storeContext);
	const [user, setUser] = useState({});
	const [hasError, setHasErrors] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			setHasErrors(false);
			await client.post("/users/create", user);
			dispatch(setUserView(USER_LIST_VIEW));
		} catch (err) {
			setHasErrors(true);
			setIsLoading(false);
		}
	};

	return (
		<Flex flexDirection="column" width="100%" pt="3">
			<form onSubmit={handleSubmit}>
				<FormControl>
					<Input
						onChange={handleChange}
						boxSizing="border-box"
						type="text"
						name="username"
						placeholder="username"
						borderColor={hasError ? "#c86f5e" : "grey"}
						mb="2"
					/>
					<Input
						onChange={handleChange}
						boxSizing="border-box"
						mb="2"
						type="password"
						name="password"
						placeholder="password"
						borderColor={hasError ? "#c86f5e" : "grey"}
						width="100%"
					/>
					<Flex>
						<Button
							isLoading={isLoading}
							flex="1"
							type="submit"
							m="1"
							border="0"
							color="#fc5c9c"
						>
							Create
						</Button>
						<Button
							flex="1"
							border="0"
							m="1"
							color="grey"
							onClick={() => dispatch(setUserView(USER_LIST_VIEW))}
						>
							Cancel
						</Button>
					</Flex>
				</FormControl>
			</form>
		</Flex>
	);
};

export default NewUserForm;
