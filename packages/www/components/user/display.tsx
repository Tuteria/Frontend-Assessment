import Link from "next/link";

const UserDisplay = ({ user, viewUserNotes }: UserDisplayProps) => {
	return (
		<div className="border border-left-0 border-primary border-right-0 border-top-0 p-3 align-items-center mb-0">
			<hgroup className="flex-grow-1">
				<h5 className="text-dark">{user?.name}</h5>
				<h6 className="text-uppercase">
					<Link href="/[username]" as={`/${user?.username}`}>
						<a className="text-dark flex-grow-1">{`Visit ${user?.username}'s page`}</a>
					</Link>
				</h6>
			</hgroup>
			<button
				className="btn pl-0"
				onClick={() => viewUserNotes(user?.username)}
			>
				View Notes{" "}
				<svg
					viewBox="0 0 16 16"
					className="bi bi-caret-right-fill"
					fill="currentColor"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
				</svg>
			</button>
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
