import React from 'react';
import styles from './table.module.css';
import classNames from "classnames/bind";
import {Spinner} from "@chakra-ui/core";
import {TableRow} from "../tableRow/tableRow";

let cx = classNames.bind(styles);


export default function Table ({users, onRowViewClick, loading}: any) {
	if (loading) {
		return (
			<div className={styles.listItems}>
				<Spinner size="xl" />
			</div>
		);
	}

	if (users.length === 0) {
		return (
			<div className={styles.listItems}>
				<div className={styles.wrapperMessage}>
					<span className={styles.iconCheck}/>
					<div className={styles.titleMessage}>There are no users</div>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.tableHeader}>
				<div className={cx({element:true, userHeaderElement: true})}>
					<p>Username</p>
				</div>
				<div className={cx({element:true, emailHeaderElement: true})}>
					<p>Email</p>
				</div>
				<div className={cx({element:true, totalNoHeaderElement: true})}>
					<p>Notes count</p>
				</div>
				<div className={cx({element:true, actionHeaderElement: true})}>
					<p>view</p>
				</div>
			</div>
			<div className={styles.tableBody}>
				{
					users.map((user: any, index: any) => {
						return <TableRow key={index} id={user.id} username={user.username} email={user.email}
														 notes={user.notes} onViewClick={onRowViewClick}/>
					})
				}
			</div>
		</div>
	);
}
