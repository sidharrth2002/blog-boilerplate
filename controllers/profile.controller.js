const User = require('../models/User')
const moment = require('moment')

module.exports = {
    getProfileData(req, res) {
        User.findById(req.params.id, (err, doc) => {
            res.send({
                dateTime: moment().toDate().getTime()
                , ...doc
            });
        })
    }
}