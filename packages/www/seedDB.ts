import {
  clearNotes, clearUsers, loadNotes, loadUsers, loadUserNotes
} from './utils/seedTestDB';


async function seedDB(size) {
  console.log('Starting.......');
  console.log('Clearing records.....')
  await clearNotes();
  await clearUsers();

  await loadNotes(size);
  console.log(`Added ${size} anonymous notes.....`)

  console.log(`Added ${size} users.....`)
  const users = await loadUsers(size)

  console.log(`Adding ${size} notes for each users' notes.....`);
  for(const user of users) {
    await loadUserNotes(user.id, size)
  }
  console.log('Done...')
}

seedDB(20)
  .then(() => {
    process.exit()
  })
  .catch((err) => {
    console.log(err);
    process.exit(1)
  })