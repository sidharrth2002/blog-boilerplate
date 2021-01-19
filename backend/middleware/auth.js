const jwt = require('jsonwebtoken');
const secret = process.env.BCRYPT_SECRET;

const withAuth = (req, res, next) => {
    const token = 
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;

    if (!token) {
        console.log('no token')
        res.status(401).send('Unauthorized. No token.');
    } else {jwt.verify(token, process.env.BCRYPT_SECRET, (err, decoded) => {
        if (err) {
            console.log(err)
            res.status(401).send('Unauthorized: Invalid token');
        }
        else {
            req.email = decoded.email;
            next();
        }
    })}
}

module.exports = withAuth;