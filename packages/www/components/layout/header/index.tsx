// Module imports
import React, { Component } from "react";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

// Asset imports
import headerLinks from "./data/headerLinks.json";

// Start & Export Components
export default class Header extends Component<HeaderProps, HeaderState> {
	state: HeaderState = {
		navIsHidden: true,
		toggleIsAnimated: false,
	};

	renderHeaderLinks = () =>
		headerLinks.map(({ name, path }: HeaderLinks, i) => (
			<li
				key={`headerLink${i}`}
				className={`animate__animated nav-item ${i === 0 ? "active" : ""}`}
				onClick={() => this.toggleHeaderMenu()}
			>
				<Link href={path}>
					<a className="nav-link text-white">{name}</a>
				</Link>
			</li>
		));

	toggleHeaderMenu = () =>
		this.setState({
			navIsHidden: !this.state.navIsHidden,
			toggleIsAnimated: !this.state.toggleIsAnimated,
		});

	renderToggleButton = () => (
		<button
			className="navbar-toggler d-flex align-items-center"
			type="button"
			data-toggle="collapse"
			data-target="#navbarToggleExternalContent"
			aria-controls="navbarToggleExternalContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
			onClick={() => this.toggleHeaderMenu()}
		>
			<p className="mr-2 my-0">MENU</p>
			<div
				id="toggleDiv"
				className={this.state.toggleIsAnimated ? "change" : ""}
			>
				<div className="bar1 bg-white"></div>
				<div className="bar2 bg-white"></div>
				<div className="bar3 bg-white"></div>
			</div>
		</button>
	);

	render = () => (
		<header id="header">
			<Container
				className={`h-100 px-0 nav position-fixed ${
					this.state.navIsHidden ? "nav-hide" : "nav-show"
				}`}
				id="navbarToggleExternalContent"
				fluid
			>
				<Row className="align-items-center h-100 w-100 position-relative mx-0">
					<Col
						xs={3}
						sm={4}
						md={5}
						lg={6}
						className="h-100 nav-transparent position-absolute"
						onClick={() => this.toggleHeaderMenu()}
					></Col>
					<nav className="main-nav offset-3 offset-sm-4 offset-md-5 offset-lg-6 position-relative w-100 h-100 nav-main">
						<ul className="navbar-nav text-capitalize v-child px-4">
							{this.renderHeaderLinks()}
						</ul>
					</nav>
				</Row>
			</Container>
			<div className="navbar navbar-dark">
				<Container className="px-0">
					<Link href="/">
						<a className="navbar-brand px-0">Notes</a>
					</Link>
					{this.renderToggleButton()}
				</Container>
			</div>
		</header>
	);
}

interface HeaderProps {}

interface HeaderState {
	toggleIsAnimated: boolean;
	navIsHidden: boolean;
}

interface HeaderLinks {
	name: string;
	path: string;
}
