//npm install knex --save
//npm install mysql2

import fn from 'knex';

export const connectionInfo = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'admin',
  database: 'finaltest_db'
};

const knex = fn({
  client: 'mysql2',
  connection: connectionInfo,
  pool: { min: 0, max: 10 }
});

export default knex;