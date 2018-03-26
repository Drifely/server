const mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  address : String,
  pob: String,
  dob: String,
  simNum: String,
  simType: String,
  gender: String,
  expired: String,
  contact: String
})

// userSchema.statics.findOneOrCreate = function findOneOrCreate(condition, datauser, callback) {
//   const self = this
//   self.findOne(condition, (err, result) => {
//       return result 
//       ? callback(err, result) 
//       : self.create(datauser, (err, result) => { return callback(err, result) })
//   })
// }

module.exports = mongoose.model('User', userSchema);