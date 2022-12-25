'use strict';
const mongoose = require('mongoose');
const {Schema} = mongoose;
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new Schema({
    name: {
        unique: true,
        type: String,
        required: true
    },
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String,
    val_id: String,
    active: Boolean
})
userSchema.plugin(uniqueValidator);
const User = mongoose.model('User', userSchema);
module.exports = {User};