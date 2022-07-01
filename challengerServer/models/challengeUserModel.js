const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const challengeUserSchema = new Schema({
  'user' : String,
  'challenge' : String,
  'challengeCompletedDates' : [Date],
  'paidDebt' : Number
});

const challengeUser = mongoose.model('challengeUser', challengeUserSchema);
module.exports = challengeUser;