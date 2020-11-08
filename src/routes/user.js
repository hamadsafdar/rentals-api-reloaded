const express = require('express');
const controller = require('../controllers/user');
const router = express.Router();

router.post('/', controller.register);
router.post('/authenticate', controller.authenticate);

module.exports = router;
