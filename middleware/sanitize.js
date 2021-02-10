const User = require("../models/User");
const Post = require('../models/BlogPost')
const Tag = require('../models/Tags')

const sanitize = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(401).send('Invalid body.');
    }
    if (req.body.password.length < 5) {
        res.status(401).send('Password is too short.');
    }
    console.log(req.body.email);
    let user = await User.findOne({email: req.body.email});
    // console.log(user);
    if(user) {
        // console.log(doc);
        console.log('used');
        res.status(401).send('That email has already been used.');
    } else {
        next();
    }
}

module.exports = sanitize;