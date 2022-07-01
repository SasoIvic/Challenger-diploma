const express = require('express');
const router = express.Router();
const controller = require('../controllers/challengeUserController.js');
const token = require('../token.js');

router.get('/', token.verify, controller.getUsersChallenges);

router.post('/savePayment', token.verify, controller.savePayment);

module.exports = router;