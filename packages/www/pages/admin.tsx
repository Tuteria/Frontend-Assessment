import React from "react";
import AuthForm from "../components/form/auth";
import UserList from "../components/user/list";
import api from "./api";
import NoteList from "../components/note/list";
import Link from "next/link";
import UserCreate from "../components/user/create";
import Layout from "../components/layout";

export default class Admin extends React.Component<AdminProps, AdminState> {
	state: AdminState = {
		isAuthed: false,
		adminUser: null,
		users: [],
		notes: [],
		username: null,
	};

	fetchNotes = async (username) => {
		const resp = await api.get(`/users/${username}/notes`);
		const notes = resp.data.data;
		this.setState({ notes });
	};

	componentDidMount = async () => {
		const res = await api.get("/users");
		const users = res.data.data;

		this.setState({ users });
	};

	getSnapshotBeforeUpdate = (prevProps, prevState) => ({
		shouldFetchNotes: prevState.username !== this.state.username,
	});

	componentDidUpdate = (prevProps, prevState, snapShot) =>
		snapShot.shouldFetchNotes ? this.fetchNotes(this.state.username) : "";

	renderHelper = () =>
		this.state.isAuthed ? (
			<Layout
				title="Admin"
				content={{
					main: (
						<>
							{this.state.adminUser?.key}
							<button
								className="btn text-danger btn-create"
								onClick={() => this.setState({ isAuthed: false })}
							>
								<svg
									width="1em"
									height="1em"
									viewBox="0 0 16 16"
									className="bi bi-power"
									fill="currentColor"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fillRule="evenodd"
										d="M5.578 4.437a5 5 0 1 0 4.922.044l.5-.866a6 6 0 1 1-5.908-.053l.486.875z"
									/>
									<path fill-rule="evenodd" d="M7.5 8V1h1v7h-1z" />
								</svg>
							</button>

							<div>
								<UserCreate
									updateUser={(user) =>
										this.setState({ users: [...this.state.users, user] })
									}
								/>
							</div>

							<NoteList
								isHome={false}
								isOwner={true}
								notes={this.state.notes}
							/>
						</>
					),
					aside: (
						<UserList
							users={this.state.users}
							viewUserNotes={(username) => this.setState({ username })}
						/>
					),
				}}
			/>
		) : (
			<Layout
				title="Admin"
				content={{
					main: (
						<AuthForm
							authAdmin={(user) =>
								this.setState({
									isAuthed: true,
									adminUser: user,
								})
							}
						/>
					),
				}}
			/>
		);

	render = () => this.renderHelper();
}

interface AdminUser {
	id: number;
	key: string;
	hash: string;
}

interface User {
	id?: number;
	name?: string;
	username?: string;
}

interface Note {
	id?: number;
	title?: string;
	description?: string;
	owner?: string;
}

interface AdminProps {}

interface AdminState {
	adminUser: AdminUser;
	isAuthed: boolean;
	users: User[];
	notes: Note[];
	username: string;
}
