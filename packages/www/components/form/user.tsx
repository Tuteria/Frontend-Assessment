import { useState } from "react";
import api from "../../pages/api";

export default function UserForm({ updateUser, setIsCollapsed }) {
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [formError, setFormError] = useState("");

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setFormError("");
				try {
					const user = { name, username };
					const res = await api.post(`/users/create`, user);

					if (res.data.error) throw new Error(res.data.message);

					await updateUser(user);
					setName("");
					setUsername("");
					setIsCollapsed(true);
				} catch (error) {
					setFormError(error.message);
				}
			}}
			className="form user-form create-form v-parent px-5"
		>
			<div className="v-child">
				<div className="shadow">
					<h5 className="text-dark mb-4">Add A New User</h5>
					<input
						type="text"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Name"
						className="form-control"
						required
					/>
					<input
						type="text"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder="Username"
						className="form-control"
						required
					/>

					{formError ? (
						<p className="mb-2 bg-danger p-2 rounded">{formError}</p>
					) : (
						""
					)}
					<button className="btn btn-primary" type="submit">Submit</button>
				</div>
			</div>
		</form>
	);
}
