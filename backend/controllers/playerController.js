const Player = require('../models/playerModel');

//get all players

// get single player

// add player
const addPlayer = async (req, res) => {
    const { firstName, lastName, picture, yearOfBirth, currentTeamId, career } = req.body;
    
// add document to database
    try {
        const player = await Player.create({
            firstName,
            lastName,
            picture,
            yearOfBirth,
            currentTeamId,
            career
        });
        res.status(200).json({player});
    } catch (err) {
        res.status(400).json({error: error.message});
    }
}

// update player

// delete player