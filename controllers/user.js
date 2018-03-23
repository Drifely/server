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
          res.send({...data._doc, jwt})
        })
      })
  }

  static create (req, res) {
    userModel.create({
      "simNum": req.body.simNum,
      "name": req.body.name,
      "gender": req.body.gender,
      "address": req.body.address,
      "pob": req.body.pob,
      "dob": req.body.dob
    })
      .then(data => {
        jwt.sign(data._doc, process.env.SECRET_KEY, (err,jwt) => {
          if (err) res.send(err)
          else res.send({
            ...data._doc,
            jwt
          })
        })
      })
      .catch(err => res.status(500).send(err))
  }

  static deleteAll (req,res) {
    userModel.remove()
      .then(data => res.send({msg: 'deleted all dummies'}))
      .catch(err => res.send({msg: 'somethinggoeswrong'}))
  }
  
  static vision (req, res) {
    userModel.findOne({simNum: req.body.vision.simNum})
      .then(data => {
        if (data) {
          res.send({exist: true, ...data})
        } else {
          res.send({exist: false, ...req.body.vision, raw: req.body.rawvision})
        }
      })
      .catch(err => console.log(error))
  }

}

module.exports = userController;