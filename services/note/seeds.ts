import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const main = async () => {
	// reset the tables when rerunning this seed to avoid constraints error
	await prisma.note.deleteMany({});
	await prisma.user.deleteMany({});
	// seed users
	const user1 = await prisma.user.create({
		data: {
			username: "bede",
			email: "bede@yahoo.com",
		},
	});

	console.log(user1);

	const user2 = await prisma.user.create({
		data: {
			username: "grace",
			email: "grace@yahoo.com",
		},
	});
	console.log(user2);

	const note1 = await prisma.note.create({
		data: {
			title: "First Note",
			body: "This is my first note",
			category: "Study",
			author: {
				connect: {
					username: user1.username,
				},
			},
		},
	});
	console.log(note1);

	const note2 = await prisma.note.create({
		data: {
			title: "Second Note",
			body: "This is my second note",
			category: "Miscellaneous",
		},
	});
	console.log(note2);
};

main()
	.catch((e: Error) => {
		console.log(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
