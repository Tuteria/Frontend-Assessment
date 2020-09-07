import Link from "next/link"

const UserDisplay = ({ user, viewUserNotes }: UserDisplayProps) => {
	return (
		<div>
			<p>{user?.name}</p>
			<p><Link href="/[username]" as={`/${user?.username}`}><a>{user?.username}</a></Link></p>
			<button onClick={() => viewUserNotes(user?.username)}>View Notes</button>
		</div>
	);
};

interface User {
	id?: number;
	name?: string;
	username?: string;
}

interface UserDisplayProps {
	user?: User;
	viewUserNotes(username: string): void;
}

export default UserDisplay;
