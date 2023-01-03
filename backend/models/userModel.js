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
    auth_players: {
        type: [String], 
        required: false,
        default: ["siema", "siema2"]
    },
    auth_teams: {
        type: [String],
        required: false
    },
    stolik: {
        type: Boolean,
        required: true
    },
    emailConfirmed: Boolean,
    adminConfirmed: Boolean,

})

// static method to signup
userSchema.statics.signup = async function(email, password, auth_players, auth_teams, stolik, emailConfirmed, adminConfirmed) {
    
    console.log("players:",auth_players)
    if(!email || !password  ) {
        throw Error('Email i hasło są wymagane');
    }
    if (!validator.isEmail(email)) {
        throw Error('Niepoprawny email');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Hasło jest za słabe');
    }

    const exists = await this.findOne({email});
    if (exists) {
        throw Error('Email już w użyciu');
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({
        email,
        password: hash,
        auth_players,
        auth_teams,
        stolik: false,
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