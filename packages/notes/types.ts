import { Request } from "express";
import { ReactChild } from "react";
import { notes as Note, users as User } from "@prisma/client";

export type CustomRequest = Request & {
	user: User | null;
};

export type HeaderProps = {
	user?: {
		username: string;
		admin: boolean;
		id: number;
	};
};

export type NavLinkProps = {
	children: string;
	href: string;
	isLast?: boolean;
	handleClick?: () => void;
};

export type GridProps = {
	children: ReactChild | ReactChild[];
};

export type NoteProps = {
	note: {
		id: number;
		title: string;
		description: string;
		author?: {
			id: number;
			username: string;
		};
		author_id: number | null;
	};
};

export type InitialState = {
	notes?: Note[];
	selectedNote?: Partial<Note>;
	isNoteModalOpen?: boolean;
	isUserModalOpen?: boolean;
	user?: User | null;
	users?: User[];
};

export type PageProviderProps = {
	children: ReactChild | ReactChild[];
	initialState: InitialState;
};
