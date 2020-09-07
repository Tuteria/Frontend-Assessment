import { useState } from "react";
import UserForm from "../form/user";

export default function UserCreate({ updateUser }: UserCreateProps) {
	const [isCollapsed, setIsCollapsed] = useState(true);

	return (
		<>
			<button onClick={() => setIsCollapsed(!isCollapsed)}>
				{isCollapsed ? "Create User" : "Close Form"}
			</button>
			{isCollapsed ? (
				""
			) : (
				<div>
					<UserForm
						setIsCollapsed={setIsCollapsed}
						updateUser={updateUser}
					/>
				</div>
			)}
		</>
	);
}


interface UserCreateProps {
	updateUser(user): void
}
