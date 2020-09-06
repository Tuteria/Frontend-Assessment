import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();

async function seedDB(count: Number = 0): Promise<Boolean> {
	for (let i = 0; i < count; i++) {
		const user = {
			username: i + faker.internet.userName(),
			email: i + faker.internet.email(),
			password: faker.internet.password(),
			role: 'user',
		};
		await prisma.users.create({ data: user });

		const note = {
			title: faker.lorem.sentence(),
			description: faker.lorem.paragraph(),
			user: user.username,
		};

		await prisma.notes.create({ data: note });
	}
	return true;
}

console.log('Populating DB...')
seedDB(20)
  .then(() => {
		process.exit();
  }).catch((error) => {
		console.log(error);
		process.exit(1);
  });
console.log('DB populated!')
export default seedDB;