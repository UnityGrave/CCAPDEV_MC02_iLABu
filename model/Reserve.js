const e = require('express')
const mongoose = require('mongoose')

const ReserveSchema = new mongoose.Schema({
    roomnumber: String,
    building: String,
    seat: { type: Number, unique: true },
    date: { type: Date },
    time: { type: Date },
    reserveUser: String, 
    reserveId: { type: Number, unique: true }
})

const Reserve = mongoose.model('Reserve', ReserveSchema)

module.exports = Reserve;