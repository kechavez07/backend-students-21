const { Pool } = require('pg');

const pool = new Pool({
  user: 'proyecto1_user',
  host: 'dpg-cus7haq3esus73fk8tbg-a.oregon-postgres.render.com',
  database: 'proyecto1db',
  password: 'MvUFh2UjTuCYtivF4eCCKL0Zu7XbCjE6',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

pool.connect()
  .then(() => console.log('Conexión exitosa a PostgreSQL'))
  .catch(err => {
    console.error('Error al conectar a PostgreSQL:', err.message);
    console.error('Detalles:', err);
  });

module.exports = pool;