import mysql from 'mysql2/promise'
import dbConfig from './dbConfig'

let pool: mysql.Pool | undefined

export function getDb() {
  if (!pool) {
    pool = mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    })
  }
  return pool
}


