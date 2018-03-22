const userModel = require('../model/user')
require('dotenv').config()

class userController {
  static findAll (req, res) {
    userModel.find({})
      .then(data => res.send(data))
      .catch(err => console.error)
  }

  static postdummy (req, res) {
    userModel.create({
      name: 'Dummy',
      address : 'String',
      pob: 'String',
      dob: 'String',
      simNum: 'unique',
      simType: 'String',
      gender: 'String',
      expired: 'String',
      contact: '081332123112'
    })
      .then(data => res.send({msg: 'dummy created', dummy:data}))
      .catch(err => console.error)
  }

  static findOneOrCreate (req, res) {
    userModel.findOneOrCreate(
      {simNum: req.body.simNum}, 
      {...req.body}, (err, data) => {
        res.send(data)
      })
  }

  static deleteAll (req,res) {
    userModel.remove()
      .then(data => res.send({msg: 'deleted all dummies'}))
      .catch(err => res.send({msg: 'somethinggoeswrong'}))
  }
  
  static vision (req, res) {
          // Imports the Google Cloud client libraries
      const vision = require('@google-cloud/vision');

      const client = new vision.ImageAnnotatorClient({
       projectId: process.env.PROJECT_ID,
       keyFilename: process.env.KEYFILE_PATH
      });
      client
       .textDetection(`gs://${process.env.BUCKET_NAME}/images/${req.file.cloudStorageObject}`)
         .then(result => {
           console.log(result);
           return result
         })
         .catch(err => {
           return err
         })
  }

}

module.exports = userController;