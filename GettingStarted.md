### Getting Started

- navigate to '/services/example' and run "npm run start:dev", server should be running on PORT 5000.

- "npm run populate:db" populates the database with sample records.

- open a new terminal and navigate to '/packages/www' and run "npm run dev" to start the front-end server. The server should run on PORT 3000. Open in browser and start creating notes.

- "/notes/create" to create an anonymous note

- "/note/[note-id]" to get a note

- "/user/[user-id]" to get all notes created by a user

- "/admin" is a protected route, to gain access, navigate to "/admin-login" and login with: email - 'admin@mail.com' | password - 'admintuteria'. This page displays a list of users and the number of notes they have created.

### Additions and what was done differently from the previous solution

- A script to populate the database with notes was added

- Housed all endpoints in Nextjs "/api" , except PUT, Delete and Post Requests.

- Anonymous Notes can now be created with no sign up required

**a few notes**

- I ensured no dependency was installed in the Nextjs application directory, a few packages were installed in the back-end because my application could not read the installed packages from the root directory.
