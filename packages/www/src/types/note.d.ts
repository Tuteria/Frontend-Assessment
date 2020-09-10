interface INote {
	id: number;
	title: string;
	description: string;
	user_id?: number;
}

interface User {
	id: number;
	username?: string;
	password?: string;
	is_admin?: boolean;
}
