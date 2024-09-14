const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.get('Authorization') || req.query.token;

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      req.user = err ? null : decoded.user;
      return next();
    });
  } else {
    req.user = null;
    return next();
  }
}