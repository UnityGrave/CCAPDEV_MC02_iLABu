const e = require('express')
const mongoose = require('mongoose')

const ResesrveSchema = new mongoose.Schema({
    roomnumber: String,
    building: String,
    date: { type: Date },
    startTime: { type: Date },
    endTime: { type: Date }, 
})

const Post = mongoose.model('Reserve', ResesrveSchema)

module.exports = Reserve