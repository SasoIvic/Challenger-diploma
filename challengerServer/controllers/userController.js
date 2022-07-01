const userModel = require('../models/userModel.js');
const challengeModel = require('../models/challengeModel.js');
const challengeuserModel = require('../models/challengeUserModel.js');
const jwt = require('jsonwebtoken');
const token = require('../token.js');

function dateDifference(d1, d2)
{ 
    return ((d1 - d2) / (24 * 60 * 60 * 1000));   
}

var getDaysInMonth = function(month,year) {
   return new Date(year, month, 0).getDate();
}

function weeksBetween(d1, d2) {
    return Math.round((d1 - d2) / (7 * 24 * 60 * 60 * 1000));
}

async function challengePreformance(userid, challengeid, month=null, year=null){
    return new Promise(resolve => {
        var data;
        challengeuserModel.findOne({user: userid, challenge: challengeid})
        .exec(function (err, challengeuser) {
            if (err) {
                return next(err);
            } 
            else {
                if (challengeuser === null) {

                    data = {
                        status: -1,
                        body: "Not found."
                    };

                    resolve(data);
                } 
                else {
                    let challengeCompletedDates = challengeuser.challengeCompletedDates;
                    let debt = 0;
                    let strike = 0;
                    let isTodayCompleted = false;

                    let today = new Date();
                    today.setUTCHours(0, 0, 0, 0);

                    var tempDates = []
                    challengeCompletedDates.forEach(async d => {
                        d = new Date(d);
                        d.setUTCHours(0, 0, 0, 0);
                        d = d.toUTCString();
                        tempDates.push(d);
                    });

                    if(tempDates.includes(today.toUTCString())){
                        strike++;
                        let hasStrike = true;
                        isTodayCompleted = true;
                        while(hasStrike){
                            today.setDate(today.getDate() - 1);
                            if(tempDates.includes(today.toUTCString()))
                                strike++;
                            else
                                hasStrike = false;
                        }
                    }
                    
                    challengeModel.findById(challengeid).exec(function (err, challenge) {
                        let startDate = challenge.start;
                        startDate.setUTCHours(0, 0, 0, 0);
                        let dateNow = new Date();
                        dateNow.setDate(dateNow.getDate() + 1);
                        dateNow.setUTCHours(0, 0, 0, 0);
                        let numOfDays = challenge.numOfDays;
                        let diffDays = dateDifference(dateNow, startDate) + 1;

                        //console.log("s: " + startDate + " dn: " + dateNow + " df: " + diffDays);

                        let preformance = null;

                        if((numOfDays === null || numOfDays === 7) && month == null && year == null){
                            numOfDays = 7;
                            preformance = ((challengeCompletedDates.length/diffDays * 10) / 10) * 100;

                            if(challengeuser.paidDebt)
                                debt = ((diffDays - challengeCompletedDates.length) * challenge.bet) - challengeuser.paidDebt;
                            else
                                debt = ((diffDays - challengeCompletedDates.length) * challenge.bet)
                        }
                        else{
                            let successWeeksCounter = 0;
                            let successedDaysInWeek = 0;
                            let allWeeksCounter = 0;
                            let strikeWeeksCounter = 0;

                            if(startDate.getUTCDay() != 1){
                                strikeWeeksCounter++;
                            }

                            while(startDate.getUTCDay() != 1){
                                startDate.setDate(startDate.getDate() + 1);
                            }

                            var arrDates = []
                            if(month != null && year != null){
                                startDate = new Date(year, month-1, 1, 10); // prvi dan v mesecu
                               startDate.setUTCHours(0, 0, 0, 0);

                                dateNow = new Date(year, month, 1, 10);
                               dateNow.setUTCHours(0, 0, 0, 0);
                            }


                            while(startDate < dateNow){
                                if(tempDates.includes(startDate.toUTCString())){
                                    successedDaysInWeek++;
                                    arrDates.push(true);
                                }
                                else{
                                    arrDates.push(false);
                                }
                                startDate.setDate(startDate.getDate() + 1);

                                if(startDate.getUTCDay() == 0){
                                    if(successedDaysInWeek >= numOfDays){
                                        successWeeksCounter++;
                                        strikeWeeksCounter++;
                                    }
                                    else{
                                        strikeWeeksCounter = 0;
                                    }
                                    allWeeksCounter++;
                                    successedDaysInWeek = 0;
                                }
                            }
                            if(successedDaysInWeek >= numOfDays){
                                strikeWeeksCounter++;
                                successWeeksCounter++;
                            }
                            preformance = (successWeeksCounter/allWeeksCounter) * 100;
                            strike = strikeWeeksCounter;

                            if(challengeuser.paidDebt)
                                debt = ((allWeeksCounter - successWeeksCounter) * challenge.bet) - challengeuser.paidDebt;
                            else
                                debt = ((diffDays - challengeCompletedDates.length) * challenge.bet)
                        }

                        if(month != null && year != null){
                            data = {
                                userId: userid,
                                arrDates: arrDates,
                            }
                        }
                        else{
                            data = {
                                status: 0,
                                body: {
                                    preformance: preformance.toFixed(2),
                                    debt: debt,
                                    strike: strike,
                                    isTodayCompleted: isTodayCompleted,
                                    userId: userid
                                }
                            }
                        }

                        resolve(data);
                    });
                }
            }
        });
    });
}

async function usersData(userid){
    return new Promise(resolve => {
        var data;
        
        userModel.findById(userid)
        .exec(function (err, user) {
            if (err) {
                return next(err);
            } 
            else{
                data = {
                    status: 0,
                    body: {
                        name: user.username,
                        userId: userid
                    }
                }
            }

            resolve(data);
        });
    });
}


/** @description :: Server-side logic for managing users */
module.exports = {

    register: function (req, res) {

        const email = req.body.email;
        userModel.findOne({email: email}, function (err, user) {

            if (err){
                return res.status(500).json({
                    status: -1,
                    body: 'Error validating email.'
                });
            }
            else if (user){
                return res.status(403).json({
                    status: -1,
                    body: 'User already exists.'
                });
            }
            else{
                try{
                    var user = new userModel({
                        username : req.body.username,
                        email : req.body.email,
                        password : req.body.password,
                    });

                    user.save(function (err, user) {
                        if (err) {
                            return res.status(500).json({
                                status: -1,
                                body: 'Error creating user. ' + err
                            });
                        }
                        return res.status(200).json({
                            status: 0,
                            body: user
                        });
                    });
                }
                catch (ex) {
                    return res.status(500).json({
                        status: -1,
                        body: 'Error saving new user'
                    });
                }
            }
        });
    },

    login: function (req, res){
        userModel.authenticate(req.body.email, req.body.password, function (err, user) {
            if (err || !user) {
                return res.status(401).json({
                    status: -1,
                    body: 'Wrong username or password.'
                });
            } 
            else {          
                jwt.sign(
                    {user: user},
                    'challenger!97',
                    {expiresIn: '2 days'},
                    function (err, token) {
                        return res.status(201).json({
                            status: 0,
                            body: token,
                        }); 
                    }
                );
            }
        });
    },

    getUser: function (req, res, next){
        userModel.findById(req.userid).exec(function (err, user) {
            if (err) {
                return next(err);
            } 
            else {
                if (user === null) {
                    res.status(401).json({
                        status: 0,
                        body: "Unauthorized"
                    });
                } 
                else {
                    res.status(200).json({
                        status: 0,
                        body: user
                    });
                }
            }
        });
    },

    getUsers: function (req, res){
        userModel.find().exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    status: 0,
                    body: 'Error getting user.'
                });
            }
            return res.json({
                status: 0,
                body: users
            });
        });
    },

    updateUser: function(req, res){
        userModel.findById(req.userid).exec(async function (err, user){
            if(err){
                return next(err);
            }
            else{
                if (user === null) {
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
                        if(req.body.username != null){
                            data.username = req.body.username;
                        }
                        if(req.body.email != null){
                            data.email = req.body.email;
                        }
                        if(req.body.password != null){
                            data.password = req.body.password;
                        }
                        if(req.body.image != null){
                            data.image = req.body.image;
                        }

                        user.updateOne({$set: data}, function(err){
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

    deleteUser: function(req, res){
        userModel.findByIdAndRemove(req.userid, function (err, user) {
            if (err) {
                return res.status(500).json({
                    status: -1,
                    body: 'Error when deleting uporabnik.'
                });
            }
            return res.status(204).json({
                status: 0,
                body: 'user deleted.'
            });
        });
    },

    /**
    parametri: 
     challenge : String (challengeID)
    */
    getUserPreformance: function (req, res){
        challengePreformance(req.userid, req.body.challenge).then(function(data){
            return res.json(data);
        });
    },

    getUserGeneralPreformance: function (req, res){
        challengeuserModel.find({user: req.userid})
        .select('challenge')
        .exec(async function (err, challenges) {
            if (err) {
                return next(err);
            } 
            else {
                let preformance = 0;
                let debt = 0;
                let strike = 0;
                let count = 0;

                var promises = [];

                challenges.forEach(challenge => {
                   // console.log(challenge);
                    const promise = challengePreformance(req.userid, challenge.challenge);
                    promises.push(promise);
                });

                let resolvedPromises = await Promise.all(promises);

                resolvedPromises.forEach(function(data){
                   // console.log(data);
                    preformance = eval(preformance) + eval(data.body.preformance);
                   // console.log(preformance);
                    debt += data.body.debt;
                    if(count == 0){
                        strike = data.body.strike;
                    }
                    else{
                        if(data.body.strike < strike){
                            strike = data.body.strike;
                        }
                    }
                    count++;
                });

                return res.json({
                    preformance : (preformance/count).toFixed(2),
                    debt : debt,
                    strike : strike 
                });
            }
        });
    },

    getCompletedDatesForCertainMonthForAllUsers: function (req, res){
        challengeuserModel.find({challenge: req.body.challengeId})
        .exec(async function (err, challengeUsers) {
            if (err) {
                return next(err);
            } 
            else {
                var data = [];
                var promises = [];

                challengeUsers.forEach(challengeUser => {
                   // console.log(challengeUser);
                    //gre skozi vse userje v tem challenge-u (v določenem mesecu)
                    const promise = challengePreformance(challengeUser.user, req.body.challengeId, req.body.month, req.body.year);
                    promises.push(promise);
                });

                let resolvedPromises = await Promise.all(promises);

                resolvedPromises.forEach(function(userData){
                   // console.log(data);
                    data.push(
                        {
                            id: userData.userId,
                            arrDates: userData.arrDates
                        }
                    )
                });

                return res.json({
                    status: 0,
                    body: data
                });
            }
        });
    },

    getUsersStatistics: function (req, res){
        challengeuserModel.find({challenge: req.body.challengeId})
        .exec(async function (err, challengeUsers) {
            if (err) {
                return next(err);
            } 
            else {
                var data = [];
                var promises1 = [];
                var promises2 = [];

                challengeUsers.forEach(challengeUser => {
                   // console.log(challengeUser);
                    //gre skozi vse userje v tem challenge-u (v določenem mesecu)
                    let promise = challengePreformance(challengeUser.user, req.body.challengeId);
                    promises1.push(promise);

                    promise = usersData(challengeUser.user);
                    promises2.push(promise);

                });

                var resolvedPromises1 = await Promise.all(promises1);
                var resolvedPromises2 = await Promise.all(promises2);

                resolvedPromises1.forEach(function(userStatistics){
                    data.push(
                        {
                            userId: userStatistics.body.userId,
                            performance: userStatistics.body.preformance,
                            debt: userStatistics.body.debt,
                            name: ""
                        }
                    )
                });

                resolvedPromises2.forEach(function(userData){
                    data.forEach(function(d){
                        if(d.userId == userData.body.userId){
                            d.name = userData.body.name;
                        }
                    })
                });


                console.log(data);
                return res.json({
                    status: 0,
                    body: data
                });
            }
        });
    },
};
