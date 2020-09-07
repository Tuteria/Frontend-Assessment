import React from "react";
import AuthForm from "../components/form/auth";
import UserList from "../components/user/list";
import api from "./api";
import NoteList from "../components/note/list";
import Link from "next/link";
import UserCreate from "../components/user/create";

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
			<>
				{this.state.adminUser?.key}
				<button onClick={() => this.setState({ isAuthed: false })}>
					Logout
				</button>

				<p>
					<UserCreate
						updateUser={(user) =>
							this.setState({ users: [...this.state.users, user] })
						}
					/>
				</p>

				<UserList
					users={this.state.users}
					viewUserNotes={(username) => this.setState({ username })}
				/>
				<NoteList isHome={false} isOwner={true} notes={this.state.notes} />
			</>
		) : (
			<AuthForm
				authAdmin={(user) =>
					this.setState({
						isAuthed: true,
						adminUser: user,
					})
				}
			/>
		);

	render() {
		return (
			<>
				<Link href="/">
					<a>Home</a>
				</Link>
				{this.renderHelper()}
			</>
		);
	}
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
