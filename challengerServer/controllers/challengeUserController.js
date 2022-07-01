const challengeModel = require('../models/challengeModel.js');
const challengeuserModel = require('../models/challengeUserModel.js');


async function findChallenges(userChallenge){
    return new Promise(resolve => {
        challengeModel.findById(userChallenge.challenge)
        .exec(function (err, mychallenge) {
            if (err) {
                return next(err);
            } 
            else {
                var arrayOfDates = [];
                var today = new Date();
                var todayNum = new Date().getUTCDay();
                    
                if(todayNum == 0){ todayNum = 7; }
                var counter = 1;
                
                for(var i = todayNum-1; i >= 0; i--){
                    
                    var date = new Date();
                    date.setDate(today.getDate() - i);
                    date.setUTCHours(0, 0, 0, 0);
                    date = date.toUTCString();

                    counter++;      

                    var tempDates = []
                    userChallenge.challengeCompletedDates.forEach(async d => {
                        d = new Date(d);
                        d.setUTCHours(0, 0, 0, 0);
                        d = d.toUTCString();
                        tempDates.push(d);
                    });

                    if(tempDates.includes(date)){
                        arrayOfDates.push(true);
                    }
                    else{
                        if(mychallenge.daily == true){ arrayOfDates.push(false); }
                        else{ arrayOfDates.push(null); }
                    }
                }

                while(counter != 8){
                    arrayOfDates.push(null);
                    counter++;
                }

                const data = {
                    mychallenge : mychallenge,
                    arrayOfDates : arrayOfDates
                };

                resolve(data);
            }
        });
    });  
}

/** @description :: Server-side logic for managing users */
module.exports = {

    getUsersChallenges: function(req, res, next){
        challengeuserModel.find({user: req.userid})
        .exec(async function (err, userChallenges) {
            if (err) {
                return next(err);
            } 
            else {
                var promises = [];
                userChallenges.forEach(async userChallenge => {
                    const promise = findChallenges(userChallenge);
                    promises.push(promise);
                });

                let resolvedPromises = await Promise.all(promises);

                let allChallenges = [];
                resolvedPromises.forEach(function(data){
                    allChallenges.push(data);
                });

                return res.json({
                    status: 0,
                    body: allChallenges
                });
            }
        });
    },

    savePayment: function(req, res, next){
        challengeuserModel.findOne({user: req.body.user, challenge: req.body.challenge})
        .exec(function (err, userChallenge){
            if(err){
                return next(err);
            }
            else{
                if (userChallenge === null) {
                    res.status(401).json({
                        message: "Unauthorized"
                    });
                } 
                else {
                    var data = Object();

                    if (Object.keys(req.body).length === 0) {
                        return res.status(200).json({
                            status: -1,
                            body: 'Nothing to change'
                        });
                    }
                    else{
                        if(req.body.paidDebt){
                            data.paidDebt = eval(userChallenge.paidDebt) + eval(req.body.paidDebt);
                        }
                        
                        userChallenge.updateOne({$set: data}, function(err){
                            if(err){
                                return res.status(500).json({
                                    status: -1,
                                    body: err.message
                                });
                            }
                            return res.status(200).json({
                                status: 0,
                                body: "Updated"
                            });
                        });   
                    }
                }
            }
        });
    },
};
