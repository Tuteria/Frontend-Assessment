require("dotenv").config();
import jwt from "jsonwebtoken";

const secret: string | string = process.env.SECRET || "secret";

export const issueTokens = async (userData: {
	id?: number;
	username: string;
	email: string;
}) => {
	let token = await jwt.sign(userData, secret, { expiresIn: "7h" });
	return token;
};
