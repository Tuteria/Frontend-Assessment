import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from './header.module.css';
import {Button} from "@chakra-ui/core";


let cx = classNames.bind(styles);
export const Header = ({ isAdmin, username, onLogin, onLogout }: any) => (

	<div>
		<header>
			<div className={styles.container}>
				<div className={styles.logo}>
					<h1>the<span>Notes</span></h1>
				</div>
				<div className={styles.content}>
					{username ? (
						<>
							<div className={styles.user}>
								<div className={cx({isNotVisible: !isAdmin, adminIcon:true})}>
									<p className={styles.adminIconText}>Admin</p>
								</div>
								<p>{username}</p>
							</div>
							<Button onClick={onLogout}>Log out</Button>
						</>
					) : (
						<>
							<Button onClick={onLogin}>Log in</Button>
						</>
					)}
				</div>
			</div>
		</header>
	</div>
);

Header.propTypes = {
	user: PropTypes.shape({}),
	onLogin: PropTypes.func.isRequired,
	onLogout: PropTypes.func.isRequired,
	onCreateAccount: PropTypes.func.isRequired,
	isAdmin: PropTypes.bool,
	username: PropTypes.string,
};

Header.defaultProps = {
	user: null,
};
