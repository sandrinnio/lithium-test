## Starting the database

Create `.env` file to connect to local database.
Populate the file with following fields:

```
PORT=5000
URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=lithium-db
JWT_SECRET={ASK SANDRO}
JWT_EXPIRES_IN=30d
SENDGRID_API_KEY={ASK SANDRO}
```

Then download [pgAdmin 4](https://www.postgresql.org) and create `postgres` user.

## Running the app

```bash
# development
$ npm run start:dev

# production
$ npm run start:prod
```
