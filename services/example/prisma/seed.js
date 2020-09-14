const { PrismaClient } = require('@prisma/client')
const {
	seedUsers,
	seedNotes,
	seedAnonymousNotes
} = require('./seeder')

const db = new PrismaClient()

main()

async function main() {
	let results
	try {
		results = await Promise.all(
			seedUsers.map((data) => db.users.create({ data })),
		)

		console.log('Seeded: %j', results)

		results = await Promise.all(
			seedNotes.map((data) => db.notes.create({ data })),
		)

		console.log('Seeded: %j', results)

		results = await Promise.all(
			seedAnonymousNotes.map((data) => db.notes.create({ data })),
		)

		console.log('Seeded: %j', results)

	} catch (error) {
		console.log(error.message)
	} finally {
		db.$disconnect()
	}
}
