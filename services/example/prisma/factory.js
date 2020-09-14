/* eslint-disable-next-line import/no-extraneous-dependencies */
const faker = require('faker/locale/en')
const bcrypt = require('bcryptjs')

const salt = bcrypt.genSaltSync(10)
const hashPassword = bcrypt.hashSync(faker.internet.password(), salt)

const userFactory = (defaults = {}) => ({
	username: faker.internet.userName(),
	email: faker.internet.email().toLowerCase(),
	password: hashPassword,
	role: 'USER',
	...defaults,
})


const noteFactory = (user) => {
	return Array.from({ length: 5 }, () => ({
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
		users: { connect: { email: user.email } },
	}))
}



const anonymousNotesFactory = () => {
	return {
		title: faker.lorem.sentence(),
		description: faker.lorem.sentences(),
	}
}

module.exports = {
	userFactory,
	noteFactory,
	anonymousNotesFactory
}
