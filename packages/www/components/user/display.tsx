const UserDisplay = ({ user }: UserDisplayProps) => (
	<div>
		<p>{user?.name}</p>
		<p>{user?.username}</p>
	</div>
);

interface User {
	id?: number;
	name?: string;
	username?: string;
}

interface UserDisplayProps {
	user?: User;
}

export default UserDisplay;
