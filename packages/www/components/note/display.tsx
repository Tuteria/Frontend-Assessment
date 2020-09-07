import { useState } from "react";
import api from "../../pages/api";
import Link from "next/link";

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
		<>
			<div>
				<p>{title}</p>
				{isCollapsed ? "" : <p>{description}</p>}
				{isOwner ? (
					""
				) : (
					<p>
						<Link as={`/${owner}`} href="/[username]">
							<a>{owner}</a>
						</Link>
					</p>
				)}
			</div>
			<div>
				<button onClick={() => setIsCollapsed(!isCollapsed)}>
					{isCollapsed ? "View" : "Collapse"}
				</button>
				{isHome ? "" : <button onClick={() => deleteNote(note)}>Delete</button>}
			</div>
		</>
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
