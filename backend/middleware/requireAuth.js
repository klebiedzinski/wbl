const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    //grab url from request
    const url = req.originalUrl.split('/');
    //last element of url is id
    const elementId = url[url.length - 1];

    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json('Musisz się zalogować');
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: id });

        // check if user is admin or has auth to edit this element
        const isAuth =
            user.admin ||
            user.auth_players.find((player_id) => player_id === elementId) ||
            user.auth_teams.find((team_id) => team_id === elementId);
        if (isAuth) {
            req.user = { _id: user._id };

            next();
        } else {
            return res.status(401).json('Nie masz praw dostępu');
        }
    } catch (error) {
        res.status(401).json('Invalid token');
    }
};

module.exports = requireAuth;
