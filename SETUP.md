# Project Setup

Live application link: [https://notes-app-chidex.netlify.app/](https://notes-app-chidex.netlify.app/)

## Setup Requirements

Ensure you have the following installed on your machine before continuing with setup.

- NodeJs
- Python 3+ & poetry (python package manager)
- yarn or npm
- docker (optional)

## Package installation

- Clone repository running `$ git clone https://github.com/Japhethca/tuteria-fa.git`

- Change directory `$ cd tuteria-fa`
- run `yarn bootstrap or npm run bootstrap` to install dependencies

- install `data-layer` dependencies by running `poetry install`

checkout README.md for more details on installation/

## Running Application Locally

**Environment Requirements**
export the following `env` variables in your terminal

```js
export DATABASE_URL=postgres://test_user:test_pass@localhost:5529/core_db // notes database
export TEST_DATABASE_URL=postgres://test_user:test_pass@localhost:5529/test_db // test database
export NEXT_PUBLIC_API_URL=https://localhost:3000/ // example service API url used by web app
export SECRET_KEY= // secret key used by jsonwebtoken
export ADMIN_USER= // username to be used while logging into notes admin page
export ADMIN_PASSWORD= // password for the admin user

```

Replace the values of the variables according to your setup.

### Example service (Notes API)

- Apply database migrations by running `poetry run alembic upgrade head` you will need to be in `data-layer` directory.

- Run `yarn service:example db:update` to create Prisma model schema
- Run `yarn service:example db:generate` to generate Prisma definitions that would be used in the project
- start local server by running `yarn service:example start:dev`

### WWW package (Notes WEB)

- Change directory to `packages/www` and run `yarn dev`
- you should a link to view the app in the browser, follow the link.
