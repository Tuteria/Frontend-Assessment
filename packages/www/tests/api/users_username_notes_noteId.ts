import * as assert from "uvu/assert";
import "hard-rejection/register";
import { suite } from "uvu";
import nextRequest from '../../utils/nextRequest';
import '../../env';
import { signJwtToken } from '../../service/utils/authHelper';
import note from '../../pages/api/users/[username]/notes/[noteId]/index';
import { 
  clearNotes, clearUsers, loadUsers, loadUserNotes 
}from '../../utils/seedTestDB';

const Note = suite("/users/:username/notes/:noteId endpoints");

Note.before(async () => {
  const notesCount = await clearNotes();
  const usersCount = await clearUsers();
  assert.is(notesCount, 0);
  assert.is(usersCount, 0);
})

Note.after(async () => {
  const notesCount = await clearNotes();
  const usersCount = await clearUsers();
  assert.is(notesCount, 0);
  assert.is(usersCount, 0);
})

Note(
  "GET /users/:username/notes/:noteId should fetch a registered user's note if valid token was provided",
  async () => {
    const loadedUsers = await loadUsers(2);
    const loadedUserNotes = await loadUserNotes(loadedUsers[0].id, 2);
    // query values has to be strings
    const req = await nextRequest(note, {
      username: String(loadedUsers[0].username),
      noteId: String(loadedUserNotes[0].id)
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
        assert.is(res.body.data.id, loadedUserNotes[0].id)
        assert.is(res.body.data.title, loadedUserNotes[0].title)
      });
  }
);

Note(
  "PUT /users/:username/notes/:noteId should update a registered user's note if valid token was provided",
  async () => {
    const loadedUsers = await loadUsers(2);
    const loadedUserNotes = await loadUserNotes(loadedUsers[0].id, 2);
    // query values has to be strings
    const req = await nextRequest(note, {
      username: String(loadedUsers[0].username),
      noteId: String(loadedUserNotes[0].id)
    });
    const validToken = await signJwtToken({
      username: loadedUsers[0].username,
      email: loadedUsers[0].email,
      admin: loadedUsers[0].is_admin
    })
    const update = {
      title: 'Updated note',
      description: 'Updated decription'
    }
    await req.put('/')
      .set('Authorization', 'Bearer ' + validToken)
      .send(update)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.id, loadedUserNotes[0].id)
        assert.is(res.body.data.title, update.title)
      });
  }
);

Note(
  "DELETE /users/:username/notes/:noteId should update a registered user's note if valid token was provided",
  async () => {
    const loadedUsers = await loadUsers(2);
    const loadedUserNotes = await loadUserNotes(loadedUsers[0].id, 2);
    // query values has to be strings
    const req = await nextRequest(note, {
      username: String(loadedUsers[0].username),
      noteId: String(loadedUserNotes[0].id)
    });
    const validToken = await signJwtToken({
      username: loadedUsers[0].username,
      email: loadedUsers[0].email,
      admin: loadedUsers[0].is_admin
    })
    await req.delete('/')
      .set('Authorization', 'Bearer ' + validToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.id, loadedUserNotes[0].id)
        assert.is(res.body.data.title, loadedUserNotes[0].title)
      });
  }
);

Note.run()
