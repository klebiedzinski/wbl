const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const requireAuth = async (req, res, next) => {
    console.log(req)
    const { authorization } = req.headers;
    console.log(authorization)
    if (!authorization) {
        return res.status(401).json('This route requires authorization token');
    }

    const token = authorization.split(' ')[1];

    try {
        const {_id} = jwt.verify(token, process.env.JWT_SECRET);
        console.log(_id)
        req.user = await User.findOne({_id}).select('_id');

        next()
    } catch (error) {
        console.log(error)
        res.status(401).json('Invalid token');
    }


}

module.exports = requireAuth;