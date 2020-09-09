import * as assert from "uvu/assert";
import "hard-rejection/register";
import { suite } from "uvu";
import nextRequest from '../../utils/nextRequest';
import '../../env';
import { signJwtToken } from '../../service/utils/authHelper';
import notes from '../../pages/api/users/[username]/notes/index';
import notesCreate from '../../pages/api/users/[username]/notes/create'
import { 
  clearNotes, clearUsers, loadUsers, loadUserNotes 
}from '../../utils/seedTestDB';

const Users = suite("/users/:username/notes endpoints");

Users.before(async () => {
  const notesCount = await clearNotes()
  const usersCount = await clearUsers()
  assert.is(notesCount, 0);
  assert.is(usersCount, 0);
})

Users.after(async () => {
  const notesCount = await clearNotes()
  const usersCount = await clearUsers()
  assert.is(notesCount, 0);
  assert.is(usersCount, 0);
})

Users(
  "GET /users/:username/notes should fetch registered user's notes if valid token was provided",
  async () => {
    const loadedUsers = await loadUsers();
    const userNotes = await loadUserNotes(loadedUsers[0].id, 2);
    const req = await nextRequest(notes, {
      username: loadedUsers[0].username
    });
    const validToken = await signJwtToken({
      username: loadedUsers[0].username,
      email: loadedUsers[0].email,
      admin: loadedUsers[0].is_admin
    })
    await req.get('/')
      .set('Authorization', 'Bearer ' + validToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data[0].user_id, loadedUsers[0].id)
        assert.is(res.body.data.length, userNotes.length);
      });
  }
);

Users(
  "POST /users/:username/notes/create should add a registered user's notes if valid token was provided",
  async () => {
    const loadedUsers = await loadUsers();
    const req = await nextRequest(notesCreate, {
      username: loadedUsers[0].username
    });
    const validToken = await signJwtToken({
      username: loadedUsers[0].username,
      email: loadedUsers[0].email,
      admin: loadedUsers[0].is_admin
    })
    const note = {
      title: 'Sample note',
      description: 'Sample decription'
    } 
    await req.post('/')
      .set('Authorization', 'Bearer ' + validToken)
      .send(note)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .then((res) => {
        assert.is(res.body.data.user_id, loadedUsers[0].id);
        assert.is(res.body.data.title, note.title);
      });
  }
);

Users(
  "POST /users/:username/notes/create should reject if invalid token was provided",
  async () => {
    const loadedUsers = await loadUsers();
    const req = await nextRequest(notesCreate, {
      username: loadedUsers[0].username
    });
    const invalidToken = await signJwtToken({
      username: 'abcdef',
      email: loadedUsers[0].email,
      admin: loadedUsers[0].is_admin
    })
    const note = {
      title: 'Sample note',
      description: 'Sample decription'
    } 
    await req.post('/')
      .set('Authorization', 'Bearer ' + invalidToken)
      .send(note)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((res) => {
        assert.is(res.body.status, 'error');
      });
  }
);

Users(
  "POST /users/:username/notes/create should reject required fields are missing",
  async () => {
    const loadedUsers = await loadUsers();
    const req = await nextRequest(notesCreate, {
      username: loadedUsers[0].username
    });
    const validToken = await signJwtToken({
      username: loadedUsers[0].username,
      email: loadedUsers[0].email,
      admin: loadedUsers[0].is_admin
    })
    const note = {
      description: 'Sample decription'
    } 
    await req.post('/')
      .set('Authorization', 'Bearer ' + validToken)
      .send(note)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409)
      .then((res) => {
        assert.is(res.body.status, 'error');
      });
  }
);

Users.run();
