import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { pool } from '../user-db'

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret'

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password, role } = req.body
  if (!username || !password) {
    res.status(400).json({ error: 'Missing fields' })
    return
  }


  try {
    // Check if user exists
    const exists = await pool.query('SELECT 1 FROM users WHERE username = $1', [username])
    if ((exists.rowCount ?? 0) > 0) {
      res.status(409).json({ error: 'Username already registered' })
      return
    }

    const hashed = await bcrypt.hash(password, 10)
    await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
      [username, hashed, role || 'client']
    )
    res.status(201).json({ message: 'Registered successfully' })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT username FROM users WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: result.rows[0].username });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body
  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username])
    if (result.rowCount === 0) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const user = result.rows[0]
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } })
  } catch (err) {
    res.status(500).json({ error: 'Server error' })
  }
}
