## Tuteria Frontend Assessment Test

This is the repository to be used in solving the assessment. The repository is a mono-repository managed by [Lerna](https://github.com/lerna/lerna) in combination with [Yarn Workspace]().

It is structured in such a way whereby the frontend packages are located in [/packages]() while the backend packages are located in [/services]()

To get the project up and running, You need to have [Node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/get-npm) or [yarn](https://classic.yarnpkg.com/en/docs/install) installed as well as [lerna](https://github.com/lerna/lerna) installed globally.

[Python3](https://www.python.org/downloads/) is also required to have been installed. The package manager used by [python]() is [poetry](https://python-poetry.org/) which also needs to be installed globally.


Once the repository has been cloned. The only command needed to be run to install all the dependencies is 

`> yarn bootstrap` or `npm run bootstrap` (yarn preferably)

There is a sample backend service called `example` located in the `services` directory. 

## The first task
The first task is to ensure that running `yarn test` from the root package result in all the tests passing. In order for this to happen, the following steps needs to occur

1. Navigate to the `data-layer` directory and run `poetry install` *(You should have installed poetry and python)*
2. Run `poetry run alembic revision --autogenerate -m "Added notes table"` to create the database migration for the the table specified in `data-layer/data_layer/models/notes.py` (The ORM used is [SQLAlchemy](https://docs.sqlalchemy.org/en/13/orm/tutorial.html))
3. Run `poetry run alembic upgrade head` to apply the migration to the database.
4. Navigate back to the root of the project and run `yarn service:example db:update` to create [Prisma](https://www.prisma.io/docs/) model schema
5. Run `yarn service:example db:generate` to generate [Prisma](https://www.prisma.io/docs/) definitions that would be used in the project.
6. Finally run `yarn service:example test`. All the tests in located in `services/example/tests` should pass.

**Bonus Points**
1. Instead of using `sqlite` as the database of choice, make use of [PostgreSQL](https://www.postgresql.org/). There is a [docker-compose.yml]() file provided to ease the creation of the database. Then ensure that the connection string for PostgresSQL is read as an environmental variable in 
    
    i. The `data-layer` python project
    
    ii. The `services/example/prisma` settings. You might need to go through the Prisma documentation to figure out how to switch from `sqlite` to postgresql.

## The second task
Based on the work done in the first task, you would be creating a CRUD API that consist of the following endpoints

1. `POST /notes/create` *Anonymous note creation*

2. `GET /notes` *Fetching the list of anonymous notes created*

3. `PUT /notes/:note-id` *The ability to update a specific anonymous note*

4. `DELETE /notes/:note-id` *The ability to delete a specific anonymous note*

5. `POST /users/create` *Endpoint to create a user*

6. `GET /users/:username/notes` *Fetching the notes of a particular user*

You would be creating the corresponding tables using the convention already specified in the first task

Automated Tests should be implemented on all these endpoints provided as well as any other endpoint you feel wasn't specified.

**Bonus Points**
1. Creating a different `package` which is actually a [NextJS](https://nextjs.org/docs) application to house these endpoints instead of using the `service/example` package.

2. Using a different database when running the tests since the tests would require deleting and recreation of records after each run.

3. Writing a script that can pre-populate the database with sample records.


## The Third and Final Task
Building on the work done in the second task, Building a [NextJS](https://nextjs.org/docs) application that consit of the following pages

1. The home page consisting of A list of Notes already created that do not belong to any user with the ability to read the detail of each note when clicked as well as the ability. 

2. A user page which displays the list of notes for the user whose username is passed in the route. Using [NextJS](https://nextjs.org/docs) routing system to pull the relevant username from the url. The ability to be able to create notes, view notes as well as delete notes should also be provided.

3. A protected page `/admin`  that would be used to create users as well as view the list of users and the number of notes created by each of them. You are free to decide how you would handle access to this page. Only requirement is that it is protected, i.e can't be accessed without some sorts of credentials provided.

**Bonus Points**
1. Creating [Storybook](https://storybook.js.org/) for the components used in creating the pages. *The project already has storybook setup*
2. Leveraging [Chakra-ui](https://chakra-ui.com/getting-started) as the component library of choice *This is already installed in the project*
3. Using the `packages/components`  to house the components being used in the project.
4. Adding relevant tests where necessary for the frontend.
5. Hosting the whole application on a production url e.g Heroku, Vercel, Netlify, AWS, Digitalocean e.t.c


This tasks require using [TypeScript](https://www.typescriptlang.org/). 

Also in order to ensure consistent commit messages, visit [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/) for commit conventions.

## Submission of the project

1. Clone the repository and provide your implementation there.
2. Submit a pull request of your implementation back to the base repository. (Bonus points making use of the [changesets](https://github.com/atlassian/changesets) when creating the PR. Also provide a live link of the hosted application. )

For any question, you can reach on  Telegram [@Beee_sama](https://t.me/Beee_sama)