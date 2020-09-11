interface INote {
	id: number;
	title: string;
	description: string;
	user_id?: number;
}

interface NoteUser {
	id?: number;
	username?: string;
	password?: string;
	is_admin?: string;
	notes?: INote[];
}
