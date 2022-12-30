'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const {Schema} = mongoose;

const userSchema = new Schema({
    email: {
        unique: true,
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String, // włodarz, stolik, team_menager, player
        required: true
    }, 
    emailConfirmed: Boolean,
    adminConfirmed: Boolean,

})

// static method to signup
userSchema.statics.signup = async function(email, password,role, emailConfirmed, adminConfirmed) {
    
    if(!email || !password  ) {
        throw Error('Email, password and role are required');
    }
    if (!validator.isEmail(email)) {
        console.log("tera se rzuce errorem i nie bedzie dzialac")
        throw Error('Invalid email');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password is not strong enough');
    }

    const exists = await this.findOne({email});
    if (exists) {
        throw Error('Email already exists');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({
        email,
        password: hash,
        role: "role",
        emailConfirmed: false,
        adminConfirmed: false
    })

    return user;
}

// Static method to login user
userSchema.statics.login = async function(email, password) {

    //grab user by email
    const user = await this.findOne({email});

    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('Incorrect password');
    }
    throw Error('Incorrect email');
}



module.exports = mongoose.model('User', userSchema);