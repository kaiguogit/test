const usersUtil = require('../utils/users');
/**
 * POST /fabric/authenticate
 * Sign in using email and password.
 */
exports.authenticate = (req, res/*, next*/) => {
    const users = usersUtil.getUsers();
    const user = users.find(entry => {
        return req.body && entry.username === req.body.username &&
            entry.password === req.body.password;
    });
    let token;
    if (user) {
        let expireDate = new Date();
        expireDate.setDate(new Date().getDate() + 1);
        expireDate = Math.floor(expireDate.getTime() / 1000);
        user.token = token = usersUtil.generateToken();
        user.expire = expireDate;
        usersUtil.updateUsers(users);
        return res.json({
            success: true,
            access_token: token,
            expire: expireDate
        });
    }
    return res.status(401).end();
  };
