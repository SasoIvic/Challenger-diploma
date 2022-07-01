const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController.js');
const token = require('../token.js');

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/getUserPreformance', token.verify, controller.getUserPreformance);
router.post('/getCalendar', controller.getCompletedDatesForCertainMonthForAllUsers);
router.post('/getUsersStatistics', controller.getUsersStatistics);

router.get('/', token.verify, controller.getUser);
router.get('/list', controller.getUsers);
router.get('/getUserGeneralPreformance', token.verify, controller.getUserGeneralPreformance);

router.put('/update', token.verify, controller.updateUser);

router.delete('/delete', token.verify, controller.deleteUser);

module.exports = router;