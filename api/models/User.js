/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  schema: true,
  migrate: 'safe',
  attributes: {
  		name:{
  			type: 'string',
  			required: true
  		},
  		title:{
  			type: 'string'
  		},
  		email:{
  			type: 'string',
  			required: true,
  			email: true,
  			unique: true
  		},
  		encryptedPassword: {
  			type : 'string'
  		}
  },

  //Encrypt the password before actually save the User

  beforeCreate : function(values, next){

        // Checks if the password/confirmation are the same

        if (!values.password || values.password != values.confirmation){
              return next(
                {
                  err: ['The passwords doesn\'t match.']
                });
        }

        //Now try to encrypt the password

        require('bcrypt').hash(values.password, 10 , function encrypPassword(err, encryptedPassword){
              if (err) return next(err);

              values.encryptedPassword = encryptedPassword;
              //values.online = true;
              next();
        });


  }

};

