import { PrismaClient } from "@prisma/client";
import faker from "faker";
import { resolve } from "path";

import { config } from "dotenv";

config({ path: resolve(__dirname, ".env") });

const prisma = new PrismaClient();

async function populateDB(unit: Number = 0): Promise<Boolean> {
	for (let i = 0; i < unit; i++) {
		// Generate users
		const user = {
			username: i + faker.internet.userName(),
			email: i + faker.internet.email(),
			password: faker.internet.password(),
			bio: faker.lorem.sentence(),
		};
		await prisma.users.create({ data: user });
		console.log(`Generated a user: %s`, user.username);

		const note = {
			title: faker.lorem.sentence(),
			description: faker.lorem.paragraph(),
			username: user.username,
		};

		await prisma.notes.create({ data: note });
		console.log(`Generated a note: %s`, note.title);
	}
	return true;
}

populateDB(30)
	.then(() => {
		process.exit();
	})
	.catch((error) => {
		console.log(error);

		process.exit(1);
	});
export default populateDB;
