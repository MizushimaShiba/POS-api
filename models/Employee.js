const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Employee = mongoose.model('Employee', new Schema({
  name: String,
  password: String,
  username: {type: String, unique: true},
  email: {type: String, unique: true},
  birthdate: Date
}))

module.exports = Employee