/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	'index': function (req, res){

		User.find({}, function UserList(err, users){

				if (err) return next(err);

				res.view({
					users: users
				});

		});
	},
	'new':function  (req,res) {
		res.view();
		// body...
	}, 
	 //CRUD functionality 
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
		var userId = req.param('id');

		User.findOne(userId, function FoundUser(err, user){
				if(err) return next(err);

				if(!user) return next();

				res.view({
					user: user
				});
		});
	},
	'edit': function (req, res, next){
		
		var userId = req.param('id');

		User.findOne(userId, function FoundUser(err, user){
				if(err) return next(err);

				if(!user) return next('User does not exists. ');

				res.view({
					user: user
				});
		});
	},
	'update': function (req, res, next){

		var userId = req.param('id');
		var formParams = req.params.all();

		User.update(userId, formParams, function UpdatedUser(err){
			if(err){
				res.redirect('/user/edit/' + userId);
			}

			res.redirect('/user/show/' +  userId);
		});
	},
	'destroy': function(req, res, next){


		var userId = req.param('id');

		User.findOne(userId, function FoundUser(err, user){
				if(err) return next(err);

				if(!user) return next('User does not exists. ');

				User.destroy(userId, function UserDeleted(err, user){
					if(err) return next(err);
				});

				res.redirect('/user');
		});
	}
};

