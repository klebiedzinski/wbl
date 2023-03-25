const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const emailSender = require('../utils/mail/emailSender');
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        const token = createToken(user._id);

        const {
            firstName,
            lastName,
            emailConfirmed,
            adminConfirmed,
            auth_players,
            auth_teams,
            stolik,
            admin,
        } = user;

        res.status(200).json({
            email,
            token,
            firstName,
            lastName,
            emailConfirmed,
            adminConfirmed,
            auth_players,
            auth_teams,
            stolik,
            admin,
        });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// signup user
const signupUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        auth_players,
        auth_teams,
        emailConfirmed,
        adminConfirmed,
        stolik,
        admin,
    } = req.body;

    try {
        const user = await User.signup(
            firstName,
            lastName,
            email,
            password,
            auth_teams,
            auth_players,
            stolik,
            admin
        );

        await emailSender.signupMail(email, user._id.toString());
        res.status(200).json({ ...user });
    } catch (err) {
        res.status(502).json({ error: err.message });
    }
};

// verify user
const verifyUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res
                .status(404)
                .json({ error: 'Nie znaleziono użytkownika' });
        }
        user.emailConfirmed = true;
        await user.save();
        res.status(200).json({ message: 'Użytkownik zweryfikowany' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// get user by email
const getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
// update user
const updateUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'Nieprawidłowe ID' });
    }
    // grab user by id and update
    const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        {
            ...req.body,
        },
        { new: true }
    );

    // check if user exists
    if (!user) {
        return res.status(404).json({ error: 'Użytkownik nie istnieje' });
    }
    return res.status(200).json({ user });
};

// delete user
const deleteUser = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'Nieprawidłowe ID' });
    }
    //grab user by id and delete
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'Użytkownik nie istnieje' });
    }

    return res.status(200).json({ user });
};

module.exports = {
    loginUser,
    signupUser,
    verifyUser,
    getAllUsers,
    updateUser,
    deleteUser,
    getUserByEmail,
};
