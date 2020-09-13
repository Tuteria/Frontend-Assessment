## Tuteria Fullstack Engineering Assessment

The following steps assume you have [Node](https://nodejs.org/en/), [Lerna](https://lerna.js.org/), [Yarn](https://classic.yarnpkg.com/en/), [Python](https://www.python.org/) (**Preferably Python 3**) and [Poetry](https://python-poetry.org/) installed on your machine.

#### Run database migrations
 Set the DATABASE_URL environment variable from your terminal
  ```bash
export DATABASE_URL="your-postgres-url"
```
**Note: Run the migrations against the TEST_DATABASE_URL too if you intend to run any tests**

 cd into the data-layer directory and run the following commands:
 ```bash
poetry install
poetry run alembic upgrade head
 ```
 
 #### Install dependencies
 cd back to the root directory and run the following command:
 ```bash
yarn bootstrap
```
#### Set environment vars
Create the .env file with all the neccessary variables in the packages/notes directory (refer to the .env.template file for assisstance).

#### Generate prisma models
From the root of the project run the following commands:
  ```bash
    yarn notes db:update
    yarn notes db:generate
  ```

#### Run the application
  ```bash
    yarn notes dev
```
 The application should be running on port 3000 or otherwise (if you specified a PORT in your .env file).
 
