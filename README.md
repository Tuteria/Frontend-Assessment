## Tuteria Fullstack Engineering Assessment

First of all, let me thank you for taking this time to learn about us, we are honored that you’re considering joining our team.

I’m Biola, Tuteria's CTO & Co-founder. Before we get into the assessment, I’ll like to give a bit more context:

1. This test was previously administered after an initial round of interviews, but we're making it public so that anyone can make an attempt in hopes of working with us.
2. We don't care about experience, but about **your ability to solve problems**. We'll be in touch with everyone who attempts this test and attempt to hire those who do well. If you're seeing this, it means we're still hiring ;)
3. Presently, we'll pay in the range of **N150,000 - N350,000 monthly,** depending on your performance on this test. This is in addition to other benefits like Learning Stipends, Housing Grant, Medical Insurance, Stock Options to exceptional teammates, etc. If you live outside Nigeria, we can only pay the dollar equivalent of the above amount using official rates.
4. We use TypeScript, Nodejs ([Expressjs](https://expressjs.com/), or [Featherjs](https://feathersjs.com/)) and Python ([Starlette](https://www.starlette.io/)) on the backend and Reactjs (Nextjs) on the frontend. We prefer Fullstack Javascript Engineers.
5. We are open to a fully remote engagement, as well as a partially remote one. If you would like to work from the office at any time, we're in Gbagada Phase 2, Lagos, Nigeria.

If you'd like to work with us, please give this a shot. You don't have to do everything, we just want to see how you solve problems and where we may need to support you, should you work with us. After this test would be the rest of the interviews via video chat.

All the very best!

### Taking and submitting the assessment

1. Clone the repository and provide your implementation to the tasks there.
2. When done, submit a pull request of your implementation to the base repository.

   **_Bonus Points:_** If you make use of the [changesets](https://github.com/atlassian/changesets) when creating the PR and also provide a live link of the hosted application.

3. These tasks require using [TypeScript](https://www.typescriptlang.org/).
4. To ensure consistent commit messages, visit [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for commit conventions.
5. We recommend you complete this assessment **within 4 days** from when you fork the project
6. If you have any questions, please reach out to me on Telegram [@Beee_sama](https://t.me/Beee_sama) or send an email to [biola@tuteria.com](mailto:biola@tuteria.com)

### The assessment

This is the repository to be used in solving the assessment. It is a mono-repository for a Note-taking app managed by [Lerna](https://github.com/lerna/lerna) in combination with [Yarn Workspace](https://github.com/Tuteria/Frontend-Assessment/blob/master).

Frontend packages are located in [/packages](https://github.com/Tuteria/Frontend-Assessment/blob/master), while the backend packages are in [/services](https://github.com/Tuteria/Frontend-Assessment/blob/master). There's a sample backend service called `example` located in the `services` directory.

To get the project up and running, you need to have [Node](https://nodejs.org/en/), [Lerna](https://github.com/lerna/lerna), and [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install) installed globally. [Python3](https://www.python.org/downloads/) and [poetry](https://python-poetry.org/) which is the package manager used by [python](https://github.com/Tuteria/Frontend-Assessment/blob/master) also need to be installed globally.

Once you've cloned the repo, simply run the below command to install all the dependencies

`> yarn bootstrap` or `npm run bootstrap` (yarn preferably)

### First task

The first task is to ensure that all tests pass when you run `yarn test` from the root package. In order for this to happen, the following steps need to occur:

1. Navigate to the `data-layer` directory and run `poetry install` *(You should have installed poetry and python)*
2. Run `poetry run alembic revision --autogenerate -m "Added notes table"` to create the database migration for the the table specified in `data-layer/data_layer/models/notes.py` (The ORM used is [SQLAlchemy](https://docs.sqlalchemy.org/en/13/orm/tutorial.html))
3. Run `poetry run alembic upgrade head` to apply the migration to the database.
4. Navigate back to the root of the project and run `yarn service:example db:update` to create [Prisma](https://www.prisma.io/docs/) model schema
5. Run `yarn service:example db:generate` to generate [Prisma](https://www.prisma.io/docs/) definitions that would be used in the project.
6. Finally run `yarn service:example test`. All the tests located in `services/example/tests` should pass.

**You get bonus points if:**

Instead of using `sqlite` as the database of choice, make use of [PostgreSQL](https://www.postgresql.org/). There is a [docker-compose.yml](https://github.com/Tuteria/Frontend-Assessment/blob/master) file provided to ease the creation of the database. Also, ensure that the connection string for PostgresSQL is read as an environmental variable in

i. The `data-layer` python project

ii. The `services/example/prisma` settings.

You may need to go through the Prisma documentation to figure out how to switch from `sqlite` to `postgresql`.

### Second task

Based on the work done in the first task, create a CRUD API that consists of the following endpoints

1. `POST /notes/create` *Anonymous note creation*
2. `GET /notes` *Fetching the list of anonymous notes created*
3. `PUT /notes/:note-id` *The ability to update a specific anonymous note*
4. `DELETE /notes/:note-id` *The ability to delete a specific anonymous note*
5. `POST /users/create` *Endpoint to create a user*
6. `GET /users/:username/notes` *Fetching the notes of a particular user*

Create the corresponding tables using the convention already specified in the first task. Ensure to implement automated testing on each of these endpoints.

**You get bonus points if:**

1. Instead of the `service/example` package, you create a different [NextJS](https://nextjs.org/docs) application `package` to house these endpoints.
2. You use a different database when running the tests since each test run will lead to deleting and recreating records.
3. You write a script that can pre-populate the database with sample records.

### Third task

Building on the work done in the second task, create a [NextJS](https://nextjs.org/docs) application that consists of the following pages:

1. The Home page which consists of a list of notes already created that do not belong to any user with the ability to read the detail of each note when clicked.
2. A User page that displays the list of notes belonging to the user whose username is passed in the route, using [NextJS](https://nextjs.org/docs)' routing system to pull the relevant username from the URL. The ability to create notes, view notes, and delete notes should be provided.
3. A Protected page `/admin` that would be used to create users and to view the list of users and notes created by each of them. You're free to decide how you would handle access to this page. The only requirement is that it is protected, i.e. can't be accessed without some sort of credentials provided.

**You get bonus points if you:**

1. Create [Storybook](https://storybook.js.org/) for the components used in creating the pages. *The project already has `storybook` setup.*
2. Use [Chakra-UI](https://chakra-ui.com/getting-started) as the component library of choice *This is already installed in the project.*
3. Use `packages/components` to house the components used in the project.
4. Add relevant tests where necessary for the frontend.
5. Host the whole application on a production URL e.g. Heroku, Vercel, Netlify, AWS, Digitalocean e.t.c
