import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import notes from "./data/notes.json";

const prisma = new PrismaClient();

(async function () {
	try {
		await prisma.users.upsert({
			where: { username: "admin" },
			create: {
				username: "admin",
				password: bcrypt.hashSync("password", 10),
				admin: true,
			},
			update: {},
		});
		for (let { title, description } of notes) {
			await prisma.$queryRaw(`
        INSERT INTO notes (title, description)
        SELECT '${title}', '${description}' 
        WHERE NOT EXISTS (
          SELECT 1 FROM notes WHERE title = '${title}'
        );`);
		}
	} catch (e) {
		console.error(e);
	} finally {
		await prisma.$disconnect();
	}
})();
