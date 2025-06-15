import { Router } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { limiter } from './middleware/rateLimit';

const router = Router();



router.get('/test', (req, res) => {
  res.json({ message: 'Test route works' });
});

// router.get('/', (req, res) => {
//   res.json({ message: 'Router root works' });
// });

// router.get('/bookings/debug', (req, res) => {
//   res.json({ message: 'Debug bookings route works' });
// });

// Proxy /api/bookings to booking-service
router.use('/bookings', (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Missing token' });
  }
  next();
}, createProxyMiddleware({
  target: 'http://booking-service:3001',
  changeOrigin: true,
  pathRewrite: (path, req) => '/bookings' + path.replace(/^\/bookings/, ''),
}));

router.use('/auth', createProxyMiddleware({
  target: 'http://user-service:3003', // <-- change from 3001 to 3003
  changeOrigin: true,
  pathRewrite: (path, req) => '/auth' + path.replace(/^\/auth/, ''),
}));

router.use(limiter);

export default router;