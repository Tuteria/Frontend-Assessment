import { FormControl, Input, Flex, Button } from "@chakra-ui/core";
import { useState, useContext } from "react";

import { storeContext, setUserView, USER_LIST_VIEW } from "../store";
import client from "../api/client";

export default () => {
	const { dispatch } = useContext(storeContext);
	const [user, setUser] = useState({});
	const [hasError, setHasErrors] = useState(false);

	const handleChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			setHasErrors(false);
			await client.post("/users/create", user);
			dispatch(setUserView(USER_LIST_VIEW));
		} catch (err) {
			setHasErrors(true);
		}
	};
	return (
		<Flex flexDirection="column" width="100%" pt="2">
			<form onSubmit={handleSubmit}>
				<FormControl>
					<Input
						onChange={handleChange}
						boxSizing="border-box"
						type="text"
						name="username"
						placeholder="username"
						borderColor={hasError ? "red" : "grey"}
						mb="2"
					/>
					<Input
						onChange={handleChange}
						boxSizing="border-box"
						mb="2"
						type="password"
						name="password"
						placeholder="user password"
						borderColor={hasError ? "red" : "grey"}
						width="100%"
					/>
					<Flex>
						<Button flex="1" type="submit" m="1" border="0" color="#fc5c9c">
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
