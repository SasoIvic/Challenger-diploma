const express = require('express');
const router = express.Router();
const controller = require('../controllers/challengeController.js');
const token = require('../token.js');

router.get('/list', token.verify, controller.getUsersChallenges);
router.get('/getChallenge/:id', token.verify, controller.getChallenge);

router.post('/save', controller.saveChallenge);
router.post('/complete/:id', token.verify, controller.completeChallenge);


module.exports = router;