import { useState } from "react";
import api from "../../pages/api";
import Link from "next/link";
import { Badge } from "react-bootstrap";

const NoteDisplay = ({
	note,
	isOwner,
	isHome,
	updateNote,
}: NoteDisplayProps) => {
	// State for if display is collapsed or not
	const [isCollapsed, setIsCollapsed] = useState(true);

	// Note
	const { id, title, description, owner } = note;

	// Delete note
	const deleteNote = async (note: Note) => {
		try {
			const res = await api.delete(`/notes/${note.id}`);
			updateNote(note);
		} catch (error) {
			console.log(error?.message);
		}
	};

	return (
		<article className="shadow bg-white mb-4 text-dark">
			<div className="d-flex align-items-center p-3">
				<Badge
					variant="primary"
					className="rounded-pill p-3 text-white font-weight-bold mr-3"
				>
					{id}
				</Badge>
				<h5 className="text-capitalize flex-grow-1 mb-0 px-2">{title}</h5>

				{isOwner ? (
					""
				) : (
					<p className="flex-grow-1">
						by{" "}
						<Link as={`/${owner}`} href="/[username]">
							<a className="text-capitalize lead">{owner}</a>
						</Link>
					</p>
				)}
				<div>
					<button className="btn" onClick={() => setIsCollapsed(!isCollapsed)}>
						{isCollapsed ? (
							<svg
								viewBox="0 0 16 16"
								className="bi bi-caret-down-fill"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
							</svg>
						) : (
							<svg
								viewBox="0 0 16 16"
								className="bi bi-caret-up-fill"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M7.247 4.86l-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
							</svg>
						)}
					</button>
					{isHome ? (
						""
					) : (
						<button
							className="btn text-danger ml-3"
							onClick={() => deleteNote(note)}
						>
							<svg
								viewBox="0 0 16 16"
								className="bi bi-trash-fill"
								fill="currentColor"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
			{isCollapsed ? "" : <div className="text-dark bg-light p-3">{description}</div>}
		</article>
	);
};

interface Note {
	id?: number;
	title?: string;
	description?: string;
	owner?: string;
}

interface NoteDisplayProps {
	isOwner: boolean;
	isHome: boolean;
	note?: Note;
	updateNote(note: Note): void;
}

export default NoteDisplay;
