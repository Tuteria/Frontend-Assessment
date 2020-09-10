
#### clone the repo
`git clone https://github.com/chidibede/Frontend-Assessment.git`

cd into the folder and run
`yarn bootstrap`

#### Running the prisma commands

`yarn service:note prisma introspect`
This introspects and updates the models

`yarn service:note prisma generate`
This runs the schema.prisma to generate the data source

`yarn service:note prisma migrate save --experimental`
This saves the migration file

`yarn service:note prisma migrate up --experimental`
This runs the migration file

### Running the dev servers

`yarn service:note run dev`
This runs the dev server for the backend

cd into packages/www and run
`yarn dev`
This runs the frontend client

Admin login details
Email: admin@yahoo.com
Password: adminpassword
