const bcrypt = require('bcryptjs')
/* eslint-disable-next-line import/no-extraneous-dependencies */
const flattenDeep = require('lodash/flattenDeep')
const {
	userFactory,
	noteFactory,
	anonymousNotesFactory
} = require('./factory')
const seedPassword = 'Thisisatestpassword'
const testEmail = 'test@email.com'
const testUsername = 'test'
const salt = bcrypt.genSaltSync(10)
const hashPassword = bcrypt.hashSync(seedPassword, salt)

const seedUsers = Array.from({ length: 3 }, () =>
	userFactory({ password: hashPassword }),
)
const knownUser = userFactory({
	email: testEmail,
	username: testUsername,
	password: hashPassword,
	is_admin: true
})

const seedNotesNested = seedUsers.map((user) => noteFactory(user));

const seedNotes = flattenDeep(seedNotesNested)

// add admin user
seedUsers.push(knownUser)

const seedAnonUserData = () => {
	const anonNotes = [];
	for (let i = 0; i < 10; i++) {
		anonNotes.push(anonymousNotesFactory());
	}

	return anonNotes;
}

const seedAnonymousNotes = seedAnonUserData();

module.exports = {
	seedPassword,
	hashPassword,
	testEmail,
	seedUsers,
	seedNotes,
	seedAnonymousNotes
}
