const e = require('express')
const mongoose = require('mongoose')

const ResesrveSchema = new mongoose.Schema({
    studentname: String,
    roomnumber: String,
    building: String,
    date: { type: Date },
    starttime: { type: Date },
    endtime: { type: Date }, 
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post