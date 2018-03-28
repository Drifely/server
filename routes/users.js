const express = require('express');
const router = express.Router();

const userController = require('../controllers/user')
const GCShelper = require('../helper/multer')
const vision = require('../helper/vision')
const decode = require('../helper/decode')

/* GET users listing. */
router.get('/', userController.findAll)
// router.post('/', userController.findOneOrCreate)
router.post('/reg', userController.create)
router.post('/dummy', userController.postdummy)
router.delete('/dummy', userController.deleteAll)
router.post('/simBio', GCShelper.multer.single('image'), GCShelper.sendUploadToGCS, vision, userController.vision)
router.post('/jwt', decode, userController.print)
router.get('/emergency', decode, userController.sendSMS)

module.exports = router;
