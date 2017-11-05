import mongoose = require('mongoose');
import { generateHash } from '../Utils';

let usersSchema: mongoose.Schema = new mongoose.Schema({
	userName:   {type: String, required: true},
	domain:     String,
	assocId:    {type: String, required: true},
	email:      {type: String, required: true},
	associate:  {
		first_name: String,
		last_name:  String
	},
	roles:      {type: Array, default: [ 'user' ]},
	created_at: {type: Date, default: Date.now()},
	updated_at: {type: Date, default: Date.now()},
	hash:       Object,
	created_by: String,
	updated_by: String
});
/*
 * .pre('save') is NOT fired on update event
 */
usersSchema.pre('save', function (next)  {

	const id = this.assocId;
	const salt = this.userName;
	const newHash = generateHash(id, false, salt);
	this.hash = newHash.txtHash;
	this.userName = this.userName ? this.userName.toLowerCase() : '';
	this.email = this.email ? this.email.toLowerCase() : '';
	next();

});
/*
 * CurrentUser MUST be passed to the model object on update
 * example
 * let a = mongoose.model();
 * a.currentUser='225101';
 */
usersSchema.pre('update', function (next) {
	this.update({}, {
		$set: {
			updated_at: new Date(),
		}
	});
	next();
});

/*
 * Returns True if results were found based on the supplied query.
 */
usersSchema.statics.exists = function(query, cb) {
	return this.findOne(query).count((err, count) => {
		if(err) return cb(err);
		return count > 0;
	});
};

export { usersSchema };

