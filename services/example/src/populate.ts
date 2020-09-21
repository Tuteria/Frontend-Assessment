import { PrismaClient } from "@prisma/client";
import faker, { random } from "faker";

interface IUserCreator {
	username: string;
	email: string;
	password: string;
	about: string;
	admin:boolean;
}

interface INoteCreator {
	title: string;
	description: string;
	author?: string;
}

const userCreator = (): IUserCreator => {
	return {
		username: `${faker.name.firstName()}-${faker.name.lastName()}`,
		email: faker.internet.email(),
		about: faker.lorem.sentence(),
		password: "drowssap001",
		admin:false
	};
};

const noteCreator = (author: string): INoteCreator => {
	const boolean = Math.round(Math.random() * 1) > 0.05;
	return {
		title: faker.lorem.words(),
		description: faker.lorem.paragraph(),
		...(boolean && {author})
	};
};

type populatorArg = number[];

const populator = async (amt: populatorArg = [5, 10]) => {
	try {
		console.log("started populating db");
		const prisma = new PrismaClient();
		await prisma.users.deleteMany({});
		console.log("compeleted deleting user");
		await prisma.notes.deleteMany({});
		console.log("compeleted deleting notes");



		const newUser = [];
		newUser.push(prisma.users.create({
			data:{
				admin:true,
				email:"admin@general.com",
				password:"password",
				username:"Admin",
				about:"He's the leader follow him"
			}
		}))
		for (let i = 0; i < amt[0]; i++) {
			newUser.push(prisma.users.create({ data: userCreator() }));
		}
		const allUser = await Promise.all(newUser);
		if (allUser.some((p) => p == undefined)) {
			console.log("something went wrong ");
		} else {
			console.log(`${allUser.length} users created`);
		}



		const newNote = [];
		for (let i = 0; i < amt[1]; i++) {
			const randomNo = Math.ceil(Math.random()*allUser.length-1)
			console.log(randomNo)
			newNote.push(prisma.notes.create({ data: noteCreator(allUser[randomNo].username!) }));
		}
		const allNote = await Promise.all(newNote);
		if (allNote.some((p) => p == undefined)) {
			console.log("something went wrong");
		} else {
			console.log(`${allNote.length} notes created`);
		}
		console.log("completed populating");
	} catch (err) {
		console.log("something went wrong", err);
	}
};

populator([5,10])

export default populator;