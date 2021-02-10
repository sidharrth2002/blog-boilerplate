const Post = require('../models/BlogPost')
const Tag = require('../models/Tags')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
    register(req, res) {
        const { email, password } = req.body;
        const user = new User({email, password});
        user.save((err) => {
            if (err) res.status(500);
            else res.status(200).send("You have been registered");
        })
    },

    login(req, res) {
        const { email, password } = req.body;
        User.findOne( { email }, (err, user) => {
            if(err) {
                console.log(err);
                res.status(500).json({
                    error: 'Internal Error.'
                });
            } else if (!user) {
                res.status(401).json({
                    error: 'Incorrect email or password.'
                })
            } else {
                user.isCorrectPassword(password, (err, same) => {
                    if (err) {
                        res.status(500).json({
                            error: 'Internal error. Wait lah'
                        })
                    } else if (!same) {
                        res.status(401).json({
                            error: 'Incorrect email or password'
                        })
                    } else {
                        const payload = { email };
                        const token = jwt.sign(payload, process.env.BCRYPT_SECRET, {
                            expiresIn: '1h'
                        });
                        res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                    }
                })
            }
        })
    },

    logout() {
        res.cookie('token', '', {maxAge: -1});
        res.sendStatus(200)    
    },

    verifyJWT() {
        let token = req.cookies.token
        jwt.verify(token, process.env.BCRYPT_SECRET, (err, decoded) => {
            if(decoded) {
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        })    
    }
}