const userModel = require('../models/userModel.js');
const challengeModel = require('../models/challengeModel.js');
const challengeuserModel = require('../models/challengeUserModel.js');

function dateDifference(d1, d2)
{ 
    return ((d1 - d2) / (24 * 60 * 60 * 1000));   
}

async function findChallenges(challengeid){
    return new Promise(resolve => {
        var data = [];
        challengeModel.findById(challengeid)
        .exec(function (err, mychallenge) {
            if (err) {
                return next(err);
            } 
            else {
                data.push(mychallenge);
                resolve(data);
            }
        });
    });  
}

/** @description :: Server-side logic for managing users */
module.exports = {

    /**
    parametri: 
     name : String
     description : String
     daily : Boolean
     numOfDays : Number
     bet : Number
     start : Date
     end : Date
     users : [user._id]
    */
    saveChallenge: function (req, res){
        const challenge = new challengeModel({
			name : req.body.name,
            description : req.body.description,
            daily : req.body.daily,
            numOfDays : req.body.numOfDays,
            bet : req.body.bet,
            start : req.body.start,
            end : req.body.end
        });

        challenge.save(function (err, challenge) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    body: 'Error when creating challenge.'
                });
            }
            else{

                req.body.users.forEach(user => {
                    const challengeuser = new challengeuserModel({
                        user : user,
                        challenge : challenge._id,
                        challengeCompletedDates : [],
                        paidDebt : 0
                    })

                    challengeuser.save(function (err, challengeuser) {
                        if (err) {
                            return res.status(500).json({
                                status: -1,
                                body: 'Error when creating challengeuser.'
                            });
                        }
                    });
                });
            }

            return res.status(201).json({
                status: 0,
                body: challenge
            });
        });
    },

    /**
    parametri: 
     complete : Bool (true-complete, false-uncomplete)
    */
    completeChallenge: function (req, res, next){
        const challengeId = req.params.id;
        const complete = req.body.complete;

        challengeuserModel.findOne({user: req.userid, challenge: challengeId}, function (err, challengeuser) {
            if(err){
                return next(err);
            }
            else{
                let date = new Date();
                let challengeCompletedDates = challengeuser.challengeCompletedDates;
                if(challengeCompletedDates[challengeCompletedDates.length-1])
                    challengeCompletedDates[challengeCompletedDates.length-1].setUTCHours(0, 0, 0, 0);
                date.setUTCHours(0, 0, 0, 0);

                if(complete){ //complete
                    if(challengeCompletedDates.length > 0 && Math.abs(dateDifference(challengeCompletedDates[challengeCompletedDates.length-1], date)) >= 1){

                        challengeCompletedDates.push(date.toUTCString());
        
                        challengeuser.updateOne(
                            {$set: {challengeCompletedDates : challengeCompletedDates}},
                            function(err){
                                if(err){
                                    return res.status(500).json({
                                        status: -1,
                                        body: err.message
                                    });
                                }

                                return res.status(200).json({
                                    status: 0,
                                    body: "Updated."
                                });
                            }
                        );
                    }
                    else if(challengeCompletedDates.length == 0){
                        challengeCompletedDates.push(date.toUTCString());

                        challengeuser.updateOne(
                            {$set: {challengeCompletedDates : challengeCompletedDates}},
                            function(err){
                                if(err){
                                    return res.status(500).json({
                                        status: -1,
                                        body: err.message
                                    });
                                }

                                return res.status(200).json({
                                    status: 0,
                                    body: "Updated."
                                });
                            }
                        );
                    }
                    else{
                        return res.status(409).json({
                            status: -1,
                            body: "Already in queue"
                        });
                    }
                }
                else{ //uncomplete

                    if(Math.abs(dateDifference(challengeCompletedDates[challengeCompletedDates.length-1], date)) < 1){
                        let removed = challengeCompletedDates.pop();
            
                        challengeuser.updateOne(
                            {$set: {challengeCompletedDates : challengeCompletedDates}},
                            function(err){
                                if(err){
                                    return res.status(500).json({
                                        status: -1,
                                        body: err.message
                                    });
                                }
                                return res.status(200).json({
                                    status: 0,
                                    body: "Updated; removed: " + removed
                                });
                            }
                        );
                    }
                    else{
                        return res.status(409).json({
                            status: -1,
                            body: "Already deleted"
                        });
                    }
                }
            }
        });   
    },

    getChallenge: function (req, res){
        challengeModel.findById(req.params.id)
        .exec(function (err, challenge) {
            if (err) {
                return next(err);
            } 
            else {
                return res.json({
                    status: 0,
                    body: challenge
                });
            }
        });
    },

    getUsersChallenges: function (req, res){
        challengeuserModel.find({user: req.userid})
        .select('challenge')
        .exec(async function (err, challenges) {
            if (err) {
                return next(err);
            } 
            else {
                var promises = [];
                challenges.forEach(async challenge => {
                    const promise = findChallenges(challenge.challenge);
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

};
