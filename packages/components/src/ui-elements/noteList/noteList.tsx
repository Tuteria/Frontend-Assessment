import React from 'react';
import PropTypes from "prop-types";
import {Spinner} from "@chakra-ui/core";
import {Note} from "../note/note";
import styles from './noteList.module.css';

export default function NoteList({ loading, notes, onEditClick, onDeleteClick, isActionable=true }: any) {

	if (loading) {
		return (
			<div className={styles.listItems}>
				<Spinner size="xl" />
			</div>
		);
	}
	if (notes.length === 0) {
		return (
			<div className={styles.listItems}>
				<div className={styles.wrapperMessage}>
					<span className={styles.iconCheck} />
					<div className={styles.titleMessage}>There are no notes</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.listItems}>
			{notes.map(note => (
				<Note key={note.id} id={note.id} title={note.title} content={note.description} onEditClick={onEditClick}
							onDeleteClick={onDeleteClick} isActionable={isActionable} />
			))}
		</div>
	);
}


NoteList.propTypes = {
	loading: PropTypes.bool,
	notes: PropTypes.array,
};

NoteList.defaultProps = {
	loading: false,
	notes: [],
};
