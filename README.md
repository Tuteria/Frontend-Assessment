## Tuteria Fullstack Engineering Assessment

### The assessment

To get the project up and running, you need to have

- [Node](https://nodejs.org/en/)
- [Lerna](https://github.com/lerna/lerna),
- [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install) installed globally.
- [Python3](https://www.python.org/downloads/)
- [poetry](https://python-poetry.org/) which is the package manager used by [python](https://github.com/Tuteria/Frontend-Assessment/blob/master) also need to be installed globally.
- [Postgres SQL](https://www.postgresql.org/download/)
  Once you've cloned the repo, simply run the below command to install all the dependencies

`> yarn bootstrap` or `npm run bootstrap` (yarn preferably)

### First task

**Update start.sh to have the correct credentials of your postgres installation**

1. Navigate to the `data-layer` directory and run `poetry install` *(You should have installed poetry and python)*
2. Run `poetry run alembic upgrade head` to apply the migration to the database.
3. Navigate back to the root of the project and run `yarn service:example db:update` to create [Prisma](https://www.prisma.io/docs/) model schema
4. Run `yarn service:example db:generate` to generate [Prisma](https://www.prisma.io/docs/) definitions that would be used in the project.
5. Finally run `yarn service:example test`. All the tests located in `services/example/tests` should pass.
6. Run `yarn service:app populate:db` to populate the db with fake/dummy data

The frontend and backend services are found inside of the `/services/app` folder. It houses an express app that wraps nextjs in it.

Run `yarn service:app dev` to run the application locally

Available frontend pages:

- / : Index of the app
- /login: login into the app
- /signup: login for authentication
- /admin: admin access
- /admin/login: admin login
- /notes/:noteId Show details of a note
- /notes/create create a new note
- /user/username : show details of a user
- /user/username/notes show the notes of a particular user

The API lives in the /api endpoint and exposes the below endpoints:

- GET /users/:username - get a user details by their username
- POST /users/create - create a new user record into the database
- POST /users/login - login a user
- POST /notes/create - create a new note into
- DELETE /notes/:noteId - delete a note
- PUT /notes/:noteId - update a note
