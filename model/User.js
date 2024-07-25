const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: null },
    userID: { type: Number, unique: true }
});

userSchema.plugin(AutoIncrement, { inc_field: 'userID', start_seq: 5004 });
userSchema.plugin(uniqueValidator, { message: 'Error, email is already in use.' });

const User = mongoose.model('User', userSchema);

module.exports = User;

