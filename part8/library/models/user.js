const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
  },
  favouriteGenre: {
    type: String,
    required: true,
  },
  passwordHash: String,
})

module.exports = mongoose.model('User', schema)
