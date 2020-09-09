import * as assert from "uvu/assert";
import "hard-rejection/register";
import { suite } from "uvu";
import nextRequest from '../../utils/nextRequest';
import '../../env';
import { signJwtToken } from '../../service/utils/authHelper';
import users from '../../pages/api/users/index';
import usersCreate from '../../pages/api/users/create';
import { 
  clearNotes, clearUsers, loadUsers, loadUserNotes 
}from '../../utils/seedTestDB';

const Users = suite("/users and /users/create endpoints");

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

Users("GET /users should fetch users if valid token was provided",
  async () => {
    const loadedUsers = await loadUsers(3);
    const req = await nextRequest(users);
    await req.get('/')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.length, loadedUsers.length)
      });
  }
);

Users("GET /users should reject if no token was provided",
  async () => {
    const loadedUsers = await loadUsers(3);
    const req = await nextRequest(users);
    await req.get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((res) => {
        assert.is(res.body.status, 'error')
      });
  }
);

Users("GET /users should reject if invalid token was provided",
  async () => {
    const loadedUsers = await loadUsers(3);
    const invalidToken = await signJwtToken({username: 'user'})
    const req = await nextRequest(users);
    await req.get('/')
      .set('Authorization', 'Bearer ' + invalidToken)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((res) => {
        assert.is(res.body.status, 'error')
      });
  }
);

Users("POST /users/create should register a user if valid token was provided",
  async () => {
    const user = {
      username: 'meme',
      email: 'meme@gmail.com',
      password: '12345'
    }
    const req = await nextRequest(usersCreate);
    await req.post('/')
      .set('Authorization', 'Bearer ' + process.env.ADMIN_TOKEN)
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.username, user.username)
      });
  }
);

Users("POST /users/create should reject if no token was provided",
  async () => {
    const user = {
      username: 'meme',
      email: 'meme@gmail.com',
      password: '12345'
    }
    const req = await nextRequest(usersCreate);
    await req.post('/')
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(403)
      .then((res) => {
        assert.is(res.body.status, 'error')
      });
  }
);

Users("POST /users/create should reject if invalid token was provided",
  async () => {
    const user = {
      username: 'meme',
      email: 'meme@gmail.com',
      password: '12345'
    }
    const invalidToken = await signJwtToken({username: 'user'})
    const req = await nextRequest(usersCreate);
    await req.post('/')
      .set('Authorization', 'Bearer ' + invalidToken)
      .send(user)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((res) => {
        assert.is(res.body.status, 'error')
      });
  }
);

Users.run();
