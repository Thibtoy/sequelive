const User = require('../models/userModel');

exports.user = function(req, res) {
	User.create({username: req.body.username, password: req.body.password}).then(user => {res.status(201).json(user)}, err => {console.log(err)});
} 