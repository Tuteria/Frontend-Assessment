import { useState } from "react";
import NoteForm from "../form/note";

export default ({ owner, updateNote }) => {
	const [isCollapsed, setIsCollapsed] = useState(true);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	return (
		<>
			<button
				className="btn text-primary btn-create"
				onClick={() => setIsCollapsed(!isCollapsed)}
			>
				{isCollapsed ? (
					<svg
						viewBox="0 0 16 16"
						className="bi bi-patch-plus-fll"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5V6z"
						/>
					</svg>
				) : (
					<svg
						viewBox="0 0 16 16"
						className="bi bi-patch-minus-fll"
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zM6 7.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1H6z"
						/>
					</svg>
				)}
			</button>
			{isCollapsed ? (
				""
			) : (
				<div>
					<NoteForm
						owner={owner}
						setIsCollapsed={setIsCollapsed}
						updateNote={updateNote}
					/>
				</div>
			)}
		</>
	);
};
