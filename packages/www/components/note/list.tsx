import NoteDisplay from "./display";
import React from "react";

// const NoteList = ({ username, notes, isOwner, isHome }: NoteListProps) => {
// 	const [array, setArray] = useState(notes);

// 	console.log(array, notes);

// 	return (
// 		<>
// 			{array.length > 0 ? (
// 				array.map((note, i) => (
// 					<NoteDisplay
// 						key={`note-display-${i}`}
// 						note={note}
// 						isOwner={isOwner}
// 						isHome={isHome}
// 						updateNote={(n) => setArray(n)}
// 					/>
// 				))
// 			) : (
// 				<p>No notes</p>
// 			)}
// 		</>
// 	);
// };

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
		console.log(this.state.array, this.props.notes);

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
					<p>No notes</p>
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
