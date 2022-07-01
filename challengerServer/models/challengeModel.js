const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const challengeSchema = new Schema({
	'name' : String,
	'description' : String,
  'daily' : Boolean,
  'numOfDays' : Number,
  'bet' : Number,
  'start' : Date,
  'end' : Date,
});

const challenge = mongoose.model('challenge', challengeSchema);
module.exports = challenge;