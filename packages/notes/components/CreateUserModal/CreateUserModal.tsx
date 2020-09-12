import React from "react";
import {
	Button,
	Box,
	Input,
	Modal,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalOverlay,
	Select,
} from "@chakra-ui/core";
import { usePageProvider } from "../PageProvider";

export default () => {
	const { state, dispatch } = usePageProvider();
	const { isUserModalOpen } = state;
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [isAdmin, updateAdmin] = React.useState("false");
	const [isLoading, setLoading] = React.useState(false);
	const handleUsernameChange = (e) => setUsername(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);
	const handleAdminChange = (e) => updateAdmin(e.target.value);

	const handleSubmit = async () => {
		try {
			setLoading(true);
			const url = `${process.env.API_URL}/users`;
			const response = await fetch(url, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					username,
					password,
					admin: JSON.parse(isAdmin),
				}),
			});

			const data = await response.json();
			if ("message" in data) throw new Error(data.message);
			dispatch({
				type: "ADD USER",
				payload: data,
			});
		} catch (e) {
			setLoading(false);
			dispatch({
				type: "ERROR",
				payload: e.message,
			});
		}
	};

	return (
		<Modal
			isOpen={isUserModalOpen}
			onClose={() => dispatch({ type: "CLOSE MODAL" })}
			isCentered
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Create User</ModalHeader>
				<ModalCloseButton backgroundColor="transparent" border="none" />
				<ModalBody>
					<Box mb="10px">
						<b>Username:</b>
						<Input
							isRequired
							value={username}
							variant="outline"
							onChange={handleUsernameChange}
						/>
					</Box>
					<Box mb="10px">
						<b>Password:</b>
						<Input
							isRequired
							type="password"
							value={password}
							onChange={handlePasswordChange}
						/>
					</Box>
					<Box mb="10px">
						<b>Admin:</b>
						<Select defaultValue={isAdmin} onChange={handleAdminChange}>
							<option value="true">True</option>
							<option value="false">False</option>
						</Select>
					</Box>
				</ModalBody>
				<ModalFooter>
					<Button
						backgroundColor="black"
						border="black"
						variant="solid"
						color="white"
						isLoading={isLoading}
						onClick={handleSubmit}
						_hover={{ backgroundColor: "black", color: "white" }}
					>
						Create User
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
