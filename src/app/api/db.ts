import mysql from 'mysql2/promise';
import dbConfig from './dbConfig';

let pool: mysql.Pool | undefined;

/**
 * Returns the singleton MySQL connection pool configured for Hostinger.
 * Uses connectionLimit: 5 to stay safely within shared hosting user connection quotas.
 */
export function getDb(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: dbConfig.host || 'localhost',
      port: dbConfig.port || 3306,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
      connectTimeout: 10000,
    });
  }
  return pool;
}

export default getDb;
