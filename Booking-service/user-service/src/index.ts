import express from 'express'
import authRoutes from './routes/auth'
import { pool } from './user-db'

const app = express()
app.use(express.json())

// Log all incoming requests (add at the top, after express() is created)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.use('/auth', authRoutes)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`User service running on port ${PORT}`)
})