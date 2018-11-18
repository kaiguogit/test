const usersUtil = require('../utils/users');

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
  // Authorization header is not set in OPTIONS pre-flight request
  if (req.method === 'OPTIONS') {
    return next();
  }

  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  const users = usersUtil.getUsers();
  const user = users.find(user => {
    if (user.token === token) {
      const expireDate = new Date(user.expire * 1000);
      return !isNaN(expireDate) && expireDate > new Date();
    }
  });
  if (user) {
    req.user = user;
    if (user.delay) {
      setTimeout(() => {
        next();
      }, user.delay * 1000);
    } else {
        next();
    }
  } else {
    return res.status(401).end();
  }
};
