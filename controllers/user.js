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
      .catch(err => res.send(err))
  }

  static postdummy (req, res) {
    if (req.body.simNum) {
      userModel.create({
        "simNum": req.body.simNum,
        "name": req.body.name,
        "gender": req.body.gender,
        "address": req.body.address,
        "pob": req.body.pob,
        "dob": req.body.dob,
        'expired': 'String',
        'contact': '081332123112'
      })
        .then(data => res.send({msg: 'dummy created', dummy:data}))
        .catch(err => res.send('error dummy'))
    } else {
      res.send({error: true})
    }
  }

  // static findOneOrCreate (req, res) {
  //   userModel.findOneOrCreate(
  //     {simNum: req.body.simNum}, 
  //     {...req.body}, (err, data) => {
  //       jwt.sign(data._doc, process.env.SECRET_KEY, (err, jwt) => {
  //         res.send({...data._doc, jwt})
  //       })
  //     })
  // }

  static create (req, res) {
    // res.send({msg: 'ANJENG'})
    userModel.create({
      "simNum": req.body.simNum,
      "name": req.body.name,
      "gender": req.body.gender,
      "address": req.body.address,
      "pob": req.body.pob,
      "dob": req.body.dob
    })
      .then(data => {
        // res.send(data)
        console.log('ini masuk kak', process.env.SECRET_KEY)
        jwt.sign(data._doc, process.env.SECRET_KEY, (err,jwt) => {
          console.log('ini jwt', jwt)
          if (err) res.send(err)
          else res.send({
            msg: 'ini masuk jancok',
            ...data._doc,
            jwt
          })
        })
      })
      .catch(err => res.send({msg: 'ini masuk error, pler', err}))
  }

  static deleteAll (req,res) {
    userModel.remove()
      .then(data => res.status(200).send({msg: 'deleted all dummies'}))
      .catch(err => res.send({msg: 'somethinggoeswrong'}))
  }
  
  static vision (req, res) {
    userModel.findOne({simNum: req.body.vision.simNum})
      .then(data => {
        if (data) {
          res.send({exist: true, ...data})
        } else {
          res.send({exist: false, ...req.body.vision})
        }
      })
      .catch(err => console.log(error))
  }

}

module.exports = userController;