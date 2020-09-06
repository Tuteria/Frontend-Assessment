import React, { useEffect, useState } from "react";
import {
	Button,
	useToast,
	Input,
	FormControl,
	FormLabel,
	Textarea,
} from "@chakra-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import { expressServer, nextApi } from "../../../utils/environment";
import Layout from "../../../components/Layout";
import { Idata } from "../..";
interface Iprops {
	error: string;
	data: Idata;
}

export async function getServerSideProps({ params }) {
	try {
		const res = await axios.get(`${nextApi}/notes/${params.id}`);
		const data = res.data;
		return {
			props: {
				data,
			},
		};
	} catch (err) {
		return {
			props: {
				error: err.message,
			},
		};
	}
}

export const Update = ({ data, error }: Iprops) => {
	const router = useRouter();
	useEffect(() => {
		if (!localStorage.getItem("tuteria")) {
			router.push("/signup");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	const toast = useToast();
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [errorMsg, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [customMsg, setcustomMsg] = useState("");

	useEffect(() => {
		if (data) {
			setTitle(data.title);
			setDescription(data.description);
		}
	}, [data]);

	async function handleSubmit(e) {
		e.preventDefault();
		setError(false);
		setLoading(true);
		setcustomMsg("");

		const payload = {
			title,
			description,
			authorId: data.authorId,
		};

		const instance = axios.create({
			withCredentials: true,
		});
		const config = {
			headers: {
				"Content-Type": "application/json",
				authorization: `bearer ${localStorage.getItem("tuteria")}`,
			},
		};

		try {
			const res = await instance.put(
				`${expressServer}/notes/${data.id}`,
				payload,
				config
			);
			if (res.data === "unauthorised") {
				return router.push("/");
			}
			if (res.data) {
				setLoading(false);
				setcustomMsg("Note successfully updated!");
				router.push(`/note/${data.id}`);
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
				{error || errorMsg
					? toast({
							title: "An error occurred.",
							description: "check your internet connection and refresh.",
							status: "error",
							duration: 5000,
							isClosable: true,
					  })
					: ""}
			</>
			<h1>Update Note</h1>
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
					Update
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

export default Update;
