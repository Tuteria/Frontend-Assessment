# Tuteria frontend assesment

## Demo
- [Home](https://frontend-assessment-v1-qe9442iob.vercel.app).
- [Admin page](https://frontend-assessment-v1-qe9442iob.vercel.app/admin).
    Credentials:
    - Username: `test`
    - Password: `Thisisatestpassword`
- [API](https://frontend-assessment-v1-qe9442iob.vercel.app/api).
- [Storybook](https://frontend-assessment-a.vercel.app/?path=/story/components-notelist--default).

## Local installation
1. export the database env variable using `export DATABASE_URL=<DATABASE_URL>`
2. Run `poetry run alembic upgrade head` to apply the migration to the database.
3. Navigate back to the root of the project and run `yarn service:example db:update` to create Prisma model schema
4. Run `yarn service:example db:generate` to generate Prisma definitions that would be used in the project.
5. Run `yarn web dev` to start the app
