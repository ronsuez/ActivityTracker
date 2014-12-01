/**
 * flashMessages
 *
 * @module      :: Policy
 * @description :: Simple policy to show all flash messages
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

	res.locals.flash = {}

	// If there is no messages, do nothing
	if(!req.session.flash) return next();

	//If not, then copy the object  into the local flash
	res.locals.flash = _.clone(req.session.flash);

  	//clear flash
  	req.session.flash  = {}

  	

  	next();
};
