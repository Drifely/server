const userModel = require('../model/user')
const jwt = require('jsonwebtoken')

require('dotenv').config()

class userController {

  static print (req, res) {
    res.send(req.body)
  }
  
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
        jwt.sign(data._doc, process.env.SECRET_KEY, (err, jwt) => {
          console.log(err)
          res.send({...data._doc, jwt})
        })
      })
  }

  static deleteAll (req,res) {
    userModel.remove()
      .then(data => res.send({msg: 'deleted all dummies'}))
      .catch(err => res.send({msg: 'somethinggoeswrong'}))
  }
  
  static vision (req, res) {
    res.send(req.body)
    // userModel.findOneOrCreate(
    //   {simNum: req.body.vision.simNum}, 
    //   {...req.body.vision}, (err, data) => {
    //      jwt.sign(data._doc, process.env.SECRET_KEY, (err, jwt) => {
        //   console.log(err)
        //   res.send({...data._doc, jwt})
        // })
    //   })
  }

}

module.exports = userController;