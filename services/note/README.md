#### clone the repo

`git clone https://github.com/chidibede/Frontend-Assessment.git`

cd into the folder and run
`yarn bootstrap`

#### Running the migrations

Navigate to the data-layer folder and run
`>poetry run alembic revision --autogenerate -m "Added notes and users and admin table"` and Run `poetry run alembic upgrade head` to apply the migration to the database.
This runs the migrations in the data-layer

Navigate back to the root and run
`yarn service:note db:update`
This introspects and updates the models

`yarn service:note db:generate`
This runs prisma generate and generate the prismaclient

#### Running tests

`yarn service:note test`

### Running the dev servers

`yarn service:note run dev`
This runs the dev server for the backend

cd into packages/www and run
`yarn dev`
This runs the frontend client

Admin login details
Email: admin@yahoo.com
Password: adminpassword
