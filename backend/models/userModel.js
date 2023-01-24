'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const {Schema} = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
    admin: {
        type: Boolean,
        required: true
    },
    emailConfirmed: Boolean,
    adminConfirmed: Boolean,

})

// static method to signup
userSchema.statics.signup = async function(firstName,lastName,email, password, auth_teams, auth_players, stolik, admin) {
    
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
        firstName,
        lastName,
        email,
        password: hash,
        auth_players,
        auth_teams,
        stolik,
        admin,
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
        if (auth && user.emailConfirmed && user.adminConfirmed) {
            return user;
        }
        if (auth && user.emailConfirmed && !user.adminConfirmed) {
            throw Error('Konto nie zostało potwierdzone przez administratora');
        }
        if (auth && !user.emailConfirmed) {
            throw Error('Nie potwierdzono adresu email');
        }
        
        throw Error('Niepoprawne hasło');
    }
    throw Error('Incorrect email');
}



module.exports = mongoose.model('User', userSchema);