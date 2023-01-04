const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({email, token});
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, 
        password, 
        auth_players, 
        auth_teams,
        emailConfirmed, 
        adminConfirmed, 
        stolik, 
        admin
    } = req.body;


    try {
        console.log(email, password,  auth_players, auth_teams, stolik, admin)
        const user = await User.signup(email, password, auth_teams , auth_players, stolik, admin);

        const token = createToken(user._id);

        res.status(200).json({email, token, auth_players, auth_teams, stolik, admin});
    }
    catch (err) {
        res.status(502).json({error: err.message});
    }
}


module.exports = {
    loginUser,
    signupUser
}