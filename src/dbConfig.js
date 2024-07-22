require('dotenv').config();const { Pool } = require('pg');

const pool = new Pool({
  user: 'higherindia_user',
  host: 'dpg-cqd4o9bv2p9s73e7lgsg-a',
  database: 'postgresql://higherindia_user:MG4SB8t10U2XDt41WU0zI4qbKKpLBWuA@dpg-cqd4o9bv2p9s73e7lgsg-a.singapore-postgres.render.com/higherindia',
  password: 'MG4SB8t10U2XDt41WU0zI4qbKKpLBWuA',
  port: 5432  
}); // Close the object with a closing curly brace

pool.connect((err, client, release) => {
  if (err) {
    return console.error('Connection error', err.stack);
  }
  console.log('Connected to the database');
  release();
});

module.exports = pool;
