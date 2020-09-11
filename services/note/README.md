#### clone the repo to run the frontend locally

`git clone https://github.com/chidibede/Frontend-Assessment.git`

cd into the folder and run
`yarn bootstrap`

### Running the next app

cd into packages/www and run
`yarn dev`
This runs the frontend client

## The Backend Server

The backend is hosted on heroku.The url is `https://chidibede-tuteria-backend.herokuapp.com/`

### Running the backend server locally (optional)

#### Running the migrations

Navigate to the data-layer folder and run
`>poetry run alembic revision --autogenerate -m "Added notes and users and admin table"`
This runs the migrations in the data-layer

Navigate back to the root and run
`yarn service:note db:update`
This introspects and updates the models

`yarn service:note db:generate`
This runs prisma generate and generate the prismaclient

#### Running tests

`yarn service:note test`
