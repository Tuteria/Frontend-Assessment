import { useState } from "react";
import api from "../../pages/api";

export default function UserForm({ updateUser, setIsCollapsed }) {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					const user = { name, username };
					const res = await api.post(`/users/create`, user);

					if(res.data.error) throw new Error(res.data.message)

					await updateUser(user);
					setName("");
					setUsername("");
					setIsCollapsed(true);
				} catch (error) {
					console.log(error?.message);
				}
			}}
		>
			<input
				type="text"
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				placeholder="Name"
			/>
			<input
			type="text"
				name="username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				placeholder="Username"
			/>
			<button type="submit">Submit</button>
		</form>
	);
}
