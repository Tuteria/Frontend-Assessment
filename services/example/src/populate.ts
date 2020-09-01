import { PrismaClient } from "@prisma/client";
import faker from "faker";

interface IUserCreator {
	username: string;
	email: string;
	password: string;
	about: string;
}

interface INoteCreator {
	title: string;
	description: string;
	author_id?: number;
}

const userCreator = (): IUserCreator => {
	return {
		username: `${faker.name.firstName}-${faker.name.lastName}`,
		email: faker.internet.email(),
		about: faker.lorem.sentence(),
		password: "drowssap001",
	};
};
const noteCreator = (arg: number): INoteCreator => {
	const boolean = Math.round(Math.random() * 1) > 0.05;
	return {
		title: faker.lorem.words(),
		description: faker.lorem.paragraph(),
		...(boolean && { author_id: Math.floor(Math.random() * arg) }),
	};
};

type populatorArg = number[];

const populator = async (amt: populatorArg = [10, 10]) => {
	try {
		console.log("started populating db");
		const prisma = new PrismaClient();
		await prisma.users.deleteMany({});
		await prisma.notes.deleteMany({});

		const newUser = [];
		for (let i = 0; i < amt[0]; i++) {
			newUser.push(prisma.users.create({ data: userCreator() }));
		}
		const allUser = await Promise.all(newUser);
		if (allUser.some((p) => p == undefined)) {
			console.log("something went wrong ");
		} else {
			console.log(`${amt[0]} users created`);
		}

		const newNote = [];
		for (let i = 0; i < amt[1]; i++) {
			newNote.push(prisma.notes.create({ data: noteCreator(amt[0]) }));
		}
		const allNote = await Promise.all(newNote);
		if (allNote.some((p) => p == undefined)) {
			console.log("something went wrong");
		} else {
			console.log(`${amt[1]} notes created`);
		}
		console.log("completed populating");
	} catch (err) {
		console.log("something went wrong", err);
	}
};

export default populator;
