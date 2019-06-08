module.exports = function(app, passport, isLoggedIn) {
	const userController = require('../controllers/userController');

	app.route('/user')
		.post(userController.user)

	app.route('/login')
		.get(passport.authenticate('local', {successRedirect: '/success', failureRedirect:'/'}));

	app.route('/success')
		.get(isLoggedIn, function(req,res){
			res.status(200).json({message: 'on est connectés!'})
		})
}

