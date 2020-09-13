import { Request } from "express";
import { ReactChild } from "react";
import { notes as Note, users as User } from "@prisma/client";
import { AppContext as Context } from "next/app";
import { IncomingMessage } from "http";
import { NextPageContext, GetServerSidePropsContext } from "next";

export type CustomRequest = Request & {
	user: {
		id: number;
		username: string;
		admin: boolean;
	} | null;
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

export interface PageContext extends GetServerSidePropsContext {
	req: IncomingMessage & {
		user: User | null;
	};
}

export interface AppContext extends Context {
	ctx: NextPageContext & {
		req: IncomingMessage & {
			user: User | null;
		};
	};
}
