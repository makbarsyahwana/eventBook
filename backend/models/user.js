const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = Schema({
    username: String,
    password: String,
    email: String,
    adminType: Number, // 1 for HR, 2 for Vendor
    created_at : { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', User)