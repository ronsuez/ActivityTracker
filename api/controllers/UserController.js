/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'new':function  (req,res) {
		res.view();
		// body...
	},
	'create':function (req, res, next) {
		
		User.create(req.params.all(), function UserCreated(err, user){

			//If there an error
			if(err) {

				req.session.flash = {
					err: err
				}

				return res.redirect('/user/new');
			}
			//After creating a user
			//redirect to show action
			//res.json(user);

			 res.redirect('/user/show/'+ user.id);
		});
	},
	'show': function (req, res, next){

		User.findOne(req.param('id'), function FoundUser(err, user){

				if(err) return next(err);

				if(!user) return next();

				res.view({
					user: user
				});
		});
	},
	'edit': function (req, res, next){

		User.findOne(req.param('id'), function FoundUser(err, user){

				if(err) return next(err);

				if(!user) return next();

				res.view({
					user: user
				});
		});
	},
	'udpate': function (req, res, next){

		var userId = req.param('id');
		var formParams = req.params.all();

		User.update(userId, formParams, function UpdatedUser(err){

			if(err){
				console.log(err);
				res.redirect('/user/edit/' + userId);
			}
		console.log(userId);
		res.redirect('/user/show/' +  userId);
		});

	}
};

