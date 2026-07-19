import jwt from 'jsonwebtoken';

export default function auth(req, res, next) {
  // Get token from header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  // Expecting format: Bearer <token>
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Invalid token format. Expecting "Bearer <token>".' });
  }

  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'nagouri_premium_secret_key_123!');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token is invalid or expired.' });
  }
}
