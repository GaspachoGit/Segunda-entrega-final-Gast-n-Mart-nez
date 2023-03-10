const mongoose = require('mongoose')

const userColection = 'user'

const userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: {
    type:String,
    unique: true,
  },
  role:{
    type: String,
    default: 'user'
  },
  password: String,

});

const User = mongoose.model(userColection, userSchema)

module.exports = User