/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new':function (req,res) {

		//expiration time of 60 seconds to the session
		/*
		var  CurrentDateObj = new Date();
		var  NewDateObj = new Date( CurrentDateObj.getTime() + 60000);
		req.session.cookie.expires = NewDateObj;
		req.session.authenticated = true;
		console.log(req.session);
		*/

		res.view();
		// body...
	},
	'create':function  (req, res, next) {

		var email = req.param('email');
		var password = req.param('password');

		//If the email/password are blank
		if(!email && !password){
			var usernamePasswordRequired =[
				{name: 'CredentialsRequired'},
				{message: 'You must enter your Credentials in order to login'}];

			req.session.flash = {
				err : usernamePasswordRequired
			}
		
			res.redirect('session/new');
			return ;
		}

		//Try to find the User Account
		User.findOneByEmail(email, function FoundUser(err, user){
				if (err) return next(err);

				//if no user is found
				if(!user){
					var userNotFound =[
							{name: 'userNotFound'},
							{message: 'The email address: ' + email + 'is not registered.'}];

					req.session.flash = {
						err : userNotFound
					}
				
					res.redirect('session/new');
					return ;
				}

		//Compare the passwords
		require('bcrypt').compare(password, user.encryptedPassword, function(err, valid){
					if (err) return next(err);

					if(!valid){
						var passwordMistmatch =[
								{name: 'passwordMistmatch'},
								{message: 'There\'s a problem with your Account. Did you forget your password?'}];

						req.session.flash = {
							err : passwordMistmatch
						}
					
						res.redirect('session/new');
						return ;
					}
		//Save the user's info into the session var
				req.session.authenticated = true;
				req.session.User = user;

				res.redirect('/user/show/' + user.id);
			});
		});
	},
	'destroy': function(req, res, next){
		//Destroy the sessions vars

		req.session.destroy();

		res.redirect('/session/new');
	}
	

};

