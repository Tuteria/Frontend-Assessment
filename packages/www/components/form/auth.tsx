import { useState } from "react";
import api from "../../pages/api";

export default function AuthForm({ authAdmin }) {
	const [key, setKey] = useState("");
	const [hash, setHash] = useState("");

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				try {
					const admin = { key, hash };

					const res = await api.post(`/admin`, admin);

					if(res.data.error) throw new Error(res.data.message)

					await authAdmin(res.data.data);
					setKey("");
					setHash("");
				} catch (error) {
					console.log(error?.message);
				}
			}}
		>
			<input
				type="text"
				name="key"
				value={key}
				onChange={(e) => setKey(e.target.value)}
				placeholder="Key"
			/>
			<input
			type="password"
				name="hash"
				value={hash}
				onChange={(e) => setHash(e.target.value)}
				placeholder="Hash"
			/>
			<button type="submit">Submit</button>
		</form>
	);
}
