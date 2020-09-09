import * as assert from "uvu/assert";
import "hard-rejection/register";
import { suite } from "uvu";
import nextRequest from '../../utils/nextRequest';
import '../../env';
import login from '../../pages/api/auth/login';
import { clearUsers, loadUsers }from '../../utils/seedTestDB';

const Auth = suite("/auth endpoints");

Auth.before(async () => {
  const count = await clearUsers()
  assert.is(count, 0);
})

Auth.after(async () => {
  const count = await clearUsers()
  assert.is(count, 0);
})

Auth("POST /auth/login should authenticate user with valid credentials",
  async () => {
    const loadedUsers = await loadUsers();
    const req = await nextRequest(login);
    await req.post('/')
      .send({
        username: loadedUsers[0].username,
        password: loadedUsers[0].password
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        assert.is(res.body.data.id, loadedUsers[0].id)
        assert.is(res.body.data.username, loadedUsers[0].username)
      });
  }
);

Auth("POST /auth/login should not authenticate user with invalid credentials",
  async () => {
    const loadedUsers = await loadUsers();
    const req = await nextRequest(login);
    await req.post('/')
      .send({
        username: loadedUsers[0].username,
        password: 'abcdefgh'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401)
      .then((res) => {
        assert.is(res.body.status, 'error')
      });
  }
);

Auth.run()
