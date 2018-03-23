const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
  jwt.verify(req.headers.token, process.env.SECRET_KEY, (err, result) => {
    if (err || result === undefined) {
      res.send({msg:'we cannot verify your token at the moment'})
    } else {
      req.body.decoded = result
      next()
    }
  })
}