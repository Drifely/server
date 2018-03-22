const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')

/* GET users listing. */
router.get('/', userController.findAll)
router.post('/', userController.findOneOrCreate)
router.post('/dummy', userController.postdummy)
router.delete('/dummy', userController.deleteAll)

module.exports = router;
