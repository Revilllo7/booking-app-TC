import { Pool } from 'pg'

export const pool = new Pool({
  user: 'postgres', // nazwa użytkownika bazy danych
  host: 'booking-db', // nazwa usługi z docker-compose
  database: 'bookingdb',
  password: 'postgres',
  port: 5432,
})
