import ServerlessPostgres = require('serverless-postgres');


const dbConfig: ServerlessPostgres.Config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  debug: true,
  delayMs: 3000,
  ssl: true,
}

export const dbClient = new ServerlessPostgres(dbConfig)
