const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
},{versionKey:false})

const userModel = mongoose.model("/user", Schema)

module.exports = userModel