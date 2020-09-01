import "./env";
import { PrismaClient } from "@prisma/client";
import expressApp from ".";
import next from "next";

const prisma = new PrismaClient();

expressApp.locals.prisma = prisma;
let PORT = 3000;
if (process.env.PORT !== undefined) {
	PORT = parseInt(process.env.PORT, 10);
}

// server.js
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
	expressApp.get("*", (req, res) => {
		return handle(req, res);
	});

	expressApp.use((error: any, req: any, res: any, next: any) => {
		if (error) {
			return res.status(error.status || 500).json({
				error: error.message || "Something bad happened",
				stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
			});
		}
	});

	expressApp.listen(3000, (error) => {
		if (error) throw error;
		console.log("> Ready on http://localhost:3000");
	});
});
