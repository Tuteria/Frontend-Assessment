import "./env";
import { PrismaClient } from "@prisma/client";
import app from ".";
import config from "../../config"
const prisma = new PrismaClient();

app.locals.prisma = prisma;
let PORT = config.PORT;
app.listen(PORT, (err?: Error) => {
	if (err) throw err;
	console.log(`> Running on localhost:${PORT}`);
});
