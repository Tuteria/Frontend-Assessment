import NoteDisplay from "./display";
import React from "react";

class NoteList extends React.Component<NoteListProps, NoteListState> {
	state: NoteListState = {
		array: this.props.notes,
	};

	getSnapshotBeforeUpdate = (prevProps, prevState) => ({
		shouldUpdate: prevProps.notes !== this.props.notes,
	});

	componentDidUpdate = (prevProps, prevState, snapShot) =>
		snapShot.shouldUpdate ? this.setState({ array: this.props.notes }) : "";

	render() {
		return (
			<>
				{this.state.array.length > 0 ? (
					this.state.array.map((note, i) => (
						<NoteDisplay
							key={`note-display-${i}`}
							note={note}
							isOwner={this.props.isOwner}
							isHome={this.props.isHome}
							updateNote={({ id }) =>
								this.setState({
									array: this.state.array.filter((item) => item.id !== id),
								})
							}
						/>
					))
				) : (
					<div className="my-5 py-5">
						<svg
							viewBox="0 0 16 16"
							className="bi bi-file-code-fill"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM6.646 5.646a.5.5 0 1 1 .708.708L5.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zm2.708 0a.5.5 0 1 0-.708.708L10.293 8 8.646 9.646a.5.5 0 0 0 .708.708l2-2a.5.5 0 0 0 0-.708l-2-2z"
							/>
						</svg>
					</div>
				)}
			</>
		);
	}
}

interface Note {
	id?: number;
	title?: string;
	description?: string;
	owner?: string;
}

interface NoteListProps {
	isHome: boolean;
	isOwner: boolean;
	notes?: Note[];
	username?: string | string[];
}

interface NoteListState {
	array?: Note[];
}

export default NoteList;
