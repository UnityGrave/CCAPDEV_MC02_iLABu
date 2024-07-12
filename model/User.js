const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    degreeProgram: { type: String, required: true },
    biography: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: null },
    userID: { type: Number, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(AutoIncrement, { inc_field: 'userID', start_seq: 5004 });

const User = mongoose.model('User', userSchema);

module.exports = User;