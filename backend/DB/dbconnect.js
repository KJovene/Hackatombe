import mysql from 'mysql2/promise';
import ENV from '../config/env.js';


const pool = mysql.createPool({
  host: ENV.DB_HOST,      // ex: hackatombe.xxxxxxx.eu-west-3.rds.amazonaws.com
  user: ENV.DB_USER,        // ton utilisateur admin RDS
  password: ENV.DB_PASSWORD,      // ton mot de passe RDS
  database: ENV.DB_NAME,    // nom de ta base
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;