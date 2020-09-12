import Head from "next/head";
import Link from "next/link";
import React from "react";

const Navbar = () => {
	return (
		<div>
			<nav className="navbar navbar-expand-lg navbar-dark bgColor">
				<Link href="/">
					<a className="navbar-brand">Notes App</a>
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item active">
							<a className="nav-link" href="#">
								Notes <span className="sr-only">(current)</span>
							</a>
						</li>
						<li className="nav-item">
							<Link href="/notes/new">
								<a className="nav-link">New Note</a>
							</Link>
						</li>
						<li className="nav-item dropdown">
							<a
								className="nav-link dropdown-toggle"
								href="#"
								id="navbarDropdown"
								role="button"
								data-toggle="dropdown"
								aria-haspopup="true"
								aria-expanded="false"
							>
								Admin
							</a>
							<div
								className="dropdown-menu dropdown-menu-right"
								aria-labelledby="navbarDropdown"
							>
								<Link href="/admin">
									<a className="dropdown-item">Admin Page</a>
								</Link>
								<div className="dropdown-divider"></div>
								<Link href="/users/my_notes">
									<a className="dropdown-item">My Notes</a>
								</Link>
								<div className="dropdown-divider"></div>
								<Link href="/users/login">
									<a className="dropdown-item">User Login</a>
								</Link>
							</div>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
