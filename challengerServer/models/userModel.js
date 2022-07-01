const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
	'username' : String,
	'email' : String,
    'password' : String,
    'image' : String,
});

//hashing a password before saving
userSchema.pre('save', function (next) {
    var user = this;
    try{
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
              return next(err);
            }
            user.password = hash;
            next();
        });
    }
    catch{
        return res.status(500).json({
            status: -1,
            body: 'Error hashing password.'
        });
    }
});

//authenticate input against database
userSchema.statics.authenticate = function (email, password, callback) {
    user.findOne({ email: email })
        .exec(function (err, user) {
            if (err) {
                return callback(err)
            } 
            else if (!user) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, function (err, result) {
                if (result === true)
                    return callback(null, user);
                else
                    return callback();
		    });
	    });
} 

const user = mongoose.model('user', userSchema);
module.exports = user;
