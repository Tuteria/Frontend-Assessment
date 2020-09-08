import { Request } from "express";
import { users as User } from "@prisma/client";

export type CustomRequest = Request & {
	user: User | null;
};
