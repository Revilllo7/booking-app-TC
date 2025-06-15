import { Pool } from 'pg'

export const pool = new Pool({
  user: 'postgres',
  host: 'user-db', // nazwa usługi z docker-compose
  database: 'userdb',
  password: 'postgres',
  port: 5432,
})
