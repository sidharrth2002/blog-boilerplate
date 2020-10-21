const jwt = require('jsonwebtoken');
const secret = process.env.BCRYPT_SECRET;

const withAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.status(401).send('Unauthorized. No token.');
    } else {jwt.verify(token, secret, (err, decoded) => {
        if (err) res.status(401).send('Unauthorized: Invalid token');
        else {
            req.email = decoded.email;
            next();
        }
    })}
}

module.exports = withAuth;