#### Running the prisma commands

`yarn service:note prisma introspect`
This introspects and updates the models

`yarn service:note prisma generate`
This runs the schema.prisma to generate the data source

`yarn service:note prisma migrate save --experimental`
This saves the migration file

`yarn service:note prisma migrate up --experimental`
This runs the migration file

#### For testing, Jest and Supertest was used.

To run the test, enter the following command
`yarn service:note run jest:test`
