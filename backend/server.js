import app from './index.js';
import ENV from './config/env.js';
import pool from './DB/dbconnect.js';

async function startServer() {
  try {
    // Test de connexion à la base
    await pool.query('SELECT 1');
    console.log('Connexion à la base de données réussie !');

    app.listen(ENV.PORT, () => {
      console.log(`Server running on port ${ENV.PORT}`);
    });
  } catch (err) {
    console.error('Erreur de connexion à la base de données :', err.message);
    process.exit(1); // Arrête le serveur si la connexion échoue
  }
}

startServer();