import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './tableRow.module.css';
import classNames from "classnames/bind";
import {IconButton} from "@chakra-ui/core";

let cx = classNames.bind(styles);


export const TableRow = ({id, username='', email='', notes=[], onViewClick}: any) => {

	return (
		<div className={styles.container}>
			<div className={cx({element:true, userElement: true})}>
				<p>{username}</p>
			</div>
			<div className={cx({element:true, emailElement: true})}>
				<p>{email}</p>
			</div>
			<div className={cx({element:true, totalNoElement: true})}>
				<p>{notes.length}</p>
			</div>
			<div className={cx({element:true, actionElement: true})}>
				<IconButton
					// variant="solid"
					variantColor="blue"
					aria-label="Edit note"
					size="sm"
					fontSize="16px"
					icon="view"
					onClick={() => onViewClick(notes)}
				/>
			</div>
		</div>
	);
}
