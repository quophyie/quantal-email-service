# Node Microservice Template

A microservice template that uses [sequelize](http://docs.sequelizejs.com/en/latest/ "Sequelize Homepage")
as the ORM framework and [db-migrate](https://db-migrate.readthedocs.io/en/latest/ "db-migrate Homepage") as 
the database migration tool

#### Requirements:
- Nodejs (at least v6)
- npm

#### Running:
Install dependencies - `npm install`
Run migrations on your postgres instance - `DATABASE_URL={YOUR_POSTGRES_DATABASE_URL} npm run migrations`
 e.g. **`DATABASE_URL=postgresql://postgres:postgres@localhost:5432/users_db node node_modules/db-migrate/bin/db-migrate up`**
Run the application - `DATABASE_URL={YOUR_POSTGRES_DATABASE_URL} PORT={YOUR_PORT} npm start`
e.g. **`DATABASE_URL=postgresql://postgres:postgres@localhost:5432/users_db PORT=3000 node index`**

 NOTES:
 - You should use at least node version 6
 - The API should follow RESTful practices
 - The code style defined in the `.jscsrc` and `.jshintrc` files should be followed - this can be validated using the jscs and jshint node modules.
 - Bonus points will be given for useful abstraction
