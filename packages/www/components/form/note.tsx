import { useState } from "react";
import api from "../../pages/api";

export default function NoteForm({ updateNote, owner, setIsCollapsed }) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [formError, setFormError] = useState("");

	return (
		<form
			onSubmit={async (e) => {
				e.preventDefault();
				setFormError("");
				try {
					const note = { title, description, owner };
					const res = await api.post(`/notes/create`, note);

					if (res.data.error) throw new Error(res.data.message);

					await updateNote(res.data.data);
					setTitle("");
					setDescription("");
					setIsCollapsed(true);
				} catch (error) {
					setFormError(error.message);
				}
			}}
			className="form note-form create-form v-parent px-5"
		>
			<div className="v-child">
				<div className="shadow">
					<h5 className="text-dark mb-4 text-capitalize">Add A New Note for {owner}</h5>

					<input
						type="text"
						name="title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title"
						className="form-control"
						required
					/>
					<textarea
						name="description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description"
						className="form-control"
						required
					/>

					{formError ? (
						<p className="mb-2 bg-danger p-2 rounded">{formError}</p>
					) : (
						""
					)}

					<button className="btn btn-primary" type="submit">
						Submit
					</button>
				</div>
			</div>
		</form>
	);
}
