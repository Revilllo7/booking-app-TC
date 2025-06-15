import rateLimit from 'express-rate-limit'
import RedisStore from 'rate-limit-redis'
import { createClient } from 'redis'

const redisClient = createClient({
  socket: {
    host: 'redis',
    port: 6379
  }
})
redisClient.connect().catch(console.error)

export const limiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.sendCommand(args)
  }),
  windowMs: 60 * 1000, // 1 minuta
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again after a minute.',
})
