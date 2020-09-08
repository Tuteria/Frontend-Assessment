interface User {
	id: number;
	username?: string;
	is_admin?: boolean;
}

interface Note {
	id: number;
	title: string | null;
	description: string | null;
	user_id: number | null;
}

declare namespace Express {
	export interface Request {
		user: User | null;
		note: Note | null;
	}
}
