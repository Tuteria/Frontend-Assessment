import React, {useState} from 'react';
import styles from './note.module.css';
import classNames from "classnames/bind";
import {Collapse, IconButton, Icon} from "@chakra-ui/core";
import PropTypes from "prop-types";

let cx = classNames.bind(styles);


export const Note = ({id, title, content, onEditClick, onDeleteClick, isActionable=true}: any) => {
	const [show, setShow] = useState(false);

	const handleToggle = () => setShow(!show);

	return (
		<div className={styles.noteContainer}>
			<Collapse startingHeight={60} isOpen={show}>
				<div className={styles.noteTop}>
					<p className={styles.noteHeader}>{title}</p>
					{isActionable ? <div className={styles.noteActions}>
						<IconButton
							// variant="solid"
							variantColor="blue"
							aria-label="Edit note"
							size="sm"
							fontSize="16px"
							icon="edit"
							onClick={() => onEditClick(id, title, content)}
						/>
						<IconButton
							// variant="outline"
							variantColor="red"
							aria-label="Delete note"
							size="sm"
							fontSize="16px"
							icon="delete"
							onClick={() => onDeleteClick(id)}
						/>
					</div>: null}
				</div>
				<p className={styles.noteContent}>{content}</p>
			</Collapse>
			<a onClick={handleToggle}>
				Show {show ? "Less" : "More"}
			</a>
		</div>
	);
}



// Note.propTypes = {
// 	id,
// 	title,
// 	content,
// 	onEditClick,
// 	onDeleteClick,
// 	isActionable: PropTypes.bool,
// 	loading: PropTypes.bool,
// 	notes: PropTypes.array,
// };
//
// Note.defaultProps = {
// 	id, title, content, onEditClick, onDeleteClick, isActionable=true
// 	loading: false,
// 	notes: [],
// };
