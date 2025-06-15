CREATE TABLE "bookings" (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  service_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indeks na unikalne rezerwacje
CREATE UNIQUE INDEX unique_booking ON bookings(date, time);