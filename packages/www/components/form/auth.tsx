import { useState } from "react";
import api from "../../pages/api";

export default function AuthForm({ authAdmin }) {
	const [key, setKey] = useState("");
	const [hash, setHash] = useState("");
	const [formError, setFormError] = useState("");

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setFormError("")
				try {
					const admin = { key, hash };
					const res = await api.post(`/admin`, admin);

					if (res.data.error) throw new Error(res.data.message);

					await authAdmin(res.data.data);
					setKey("");
					setHash("");
				} catch (error) {
					setFormError(error.message);
				}
			}}
			className="form create-form v-parent px-5"
		>
			<div className="v-child">
				<div className=" shadow">
					<h5 className="text-dark mb-4">Login to the Admin Area</h5>

					<input
						type="text"
						name="key"
						value={key}
						onChange={(e) => setKey(e.target.value)}
						placeholder="Key"
						className="form-control"
						required
					/>
					<input
						type="password"
						name="hash"
						value={hash}
						onChange={(e) => setHash(e.target.value)}
						placeholder="Hash"
						className="form-control"
						required
					/>
					{formError ?<p className="mb-2 bg-danger p-2 rounded">{formError}</p> : ""}

					<button className="btn btn-primary" type="submit">
						Submit
					</button>
				</div>
			</div>
		</form>
	);
}
