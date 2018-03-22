const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')
const GCShelper = require('../helper/multer')

/* GET users listing. */
router.get('/', userController.findAll)
router.post('/', userController.findOneOrCreate)
router.post('/dummy', userController.postdummy)
router.delete('/dummy', userController.deleteAll)
router.post('/simBio', GCShelper.multer.single('image'), GCShelper.sendUploadToGCS, userController.vision)

module.exports = router;
