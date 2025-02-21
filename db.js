const { Pool } = require('pg');

const pool = new Pool({
  user: 'panes_de_la_ruminahui_user',
  host: 'dpg-cu5st3d6l47c73bsl19g-a.oregon-postgres.render.com',
  database: 'panes_de_la_ruminahui_qnuq',
  password: 'E3pi10rnAhCfwtCjeLmim1LbXM0ROhmN',
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