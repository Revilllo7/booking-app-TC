import express from 'express';
import cors from 'cors';
import bookingRoutes from './routes/booking';

const app = express();
app.use(cors());
app.use(express.json());

// Simple request logger for healthcheck/debug
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/bookings', bookingRoutes);

// Healthcheck endpoint
app.get('/health', (req, res) => res.send('OK'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Booking service running on port ${PORT}`);
});