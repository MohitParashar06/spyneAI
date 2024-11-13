const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send('Access denied');
  }
  
  // Extract token from the "Bearer <token>" format
  const token = authHeader.split(' ')[1];
  try {
    req.user = jwt.verify(token, 'carapplication'); // replace with your JWT secret
    next();
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

module.exports = authMiddleware;

 