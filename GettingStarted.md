### Getting Started

- navigate to '/services/example' and run "npm run dev", server should be running on PORT 5000.

- open a new terminal and navigate to '/packages/www' and run "npm run dev" to start the front-end server. The server should run on PORT 3000. Open in browser and start creating notes.

- "/notes/create" to create an anonymous note

- "/note/[note-id]" to get a note

- "/user/[user-id]" to get all notes created by a user

- "/admin" is a protected route, to gain access, navigate to "/admin-login" and login in with: email - 'admin@mail.com' | password - 'admintuteria'. This page displays a list of users and the number of notes they have created.
