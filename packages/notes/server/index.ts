import next from "next";
import path from "path";
import { Request, Response } from "express";
import app from "./app";

const dev = process.env.NODE_ENV === "development";
const server = next({ dev, dir: path.join(__dirname, "..") });
const handle = server.getRequestHandler();
const port = parseInt(process.env.PORT) || 3000;

(async function() {
	try {
		await server.prepare();
		app.all("*", (req: Request, res: Response) => {
			return handle(req, res);
		});
		app.listen(port, (err?: Error) => {
			if (err) throw err;
			console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
		});
	} catch (e) {
		console.error(e);
		process.exit(1);
	}
})();
