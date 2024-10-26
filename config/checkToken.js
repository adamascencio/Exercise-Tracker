const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.query.token;
  
  if (!token) return res.status(401).json({ error: 'Access denied' });
  
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    req.user = err ? null : decoded.username;
    if (req.user) return next();
    return res.status(400).json({ error: err });
  });
} 