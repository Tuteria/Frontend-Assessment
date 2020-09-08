This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, we need to create the tables in the database:
1. Navigate to the `data-layer` directory and run `poetry install` (asuming you have poetry installed)
2. create a .env file with `export DATABASE_URL='postgres://<usernane>:<password>@<host>:5432/database_name'` and run the export command `source .env` or simpley export the above env variable, do the same if you need to run test `TEST_DATABASE_URL`

3. Run `poetry run alembic upgrade head` to apply the migration to the database (this will create the needed tables for the application to run).

4. Navigate back to the root of the project and run `yarn service:noteapp start` to complie and run the application or `yarn service:noteapp dev` to run in dev mode. 


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


