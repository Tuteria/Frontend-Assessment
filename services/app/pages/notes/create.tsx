import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import {
	Button,
	useToast,
	Input,
	FormControl,
	FormLabel,
	Textarea,
} from "@chakra-ui/core";
import axios from "axios";
import { host } from "../../config.json";
import { useRouter } from "next/router";

export const Create = ({ authToken, currentUser }) => {
	const router = useRouter();
	const toast = useToast();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [customMsg, setcustomMsg] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();
		setError(false);
		setLoading(true);
		setcustomMsg("");

		const payload = {
			title,
			description,
			username: currentUser.username,
		};

		const instance = axios.create({
			withCredentials: true,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				...(authToken ? { authorization: `bearer ${authToken}` } : {}),
			},
		};

		try {
			const res = await instance.post(`${host}/notes/create`, payload, config);

			if (res.data) {
				setLoading(false);
				setcustomMsg("Note successfully created!");
				setTitle("");
				setDescription("");
			}
		} catch (err) {
			setLoading(false);
			setError(true);
			console.log(err.message);
		}
	}
	return (
		<Layout>
			<>
				{error &&
					toast({
						title: "An error occurred.",
						description: "check your internet connection and refresh.",
						status: "error",
						duration: 5000,
						isClosable: true,
					})}
			</>
			<h1>Write a New Note</h1>
			<form onSubmit={handleSubmit}>
				<p>{customMsg}</p>
				<FormControl isRequired>
					<div>
						<FormLabel htmlFor="title">Title</FormLabel>
						<Input
							type="title"
							id="title"
							name="title"
							aria-describedby="title-helper-text"
							placeholder="Note title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							isInvalid={error}
							errorBorderColor="red.300"
						/>
					</div>
					<br />
					<div>
						<FormLabel htmlFor="description">Description</FormLabel>
						<Textarea
							className="textarea"
							id="description"
							name="description"
							aria-describedby="descriptiom-helper-text"
							placeholder="Body of Your Note"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							isInvalid={error}
							errorBorderColor="red.300"
						></Textarea>
					</div>
				</FormControl>
				<br />
				<Button
					isDisabled={loading}
					variantColor="blue"
					type="submit"
					isLoading={loading}
				>
					Submit
				</Button>
			</form>

			<style jsx>{`
				h1 {
					text-align: center;
					font-size: 1.2rem;
				}
				form {
					margin: auto;
					width: 80%;
				}
				p {
					font-size: 1rem;
				}
				.textarea {
					height: 500px;
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

export default Create;
