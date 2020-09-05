import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function prePopulateDb(records: number): Promise<Boolean> {
	for (let i = 0; i < records; i++) {
		//anonymous notes
		const note = {
			title: faker.lorem.sentence(),
			description: faker.lorem.paragraph(),
			authorId: i,
		};

		await prisma.notes.create({ data: note });
	}
	return true;
}

prePopulateDb(5)
	.then(() => {
		process.exit();
	})
	.catch((error) => {
		console.log(error.message);

		process.exit(1);
	});
export default prePopulateDb;
