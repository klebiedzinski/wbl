const Player = require('../models/playerModel');
const Team = require('../models/teamModel');
const mongoose = require('mongoose');

//get all players
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find({}).sort({lastName: 1})
        res.status(200).json({players});
    } catch (err) {
        res.status(400).json({error: error.message});
    }
}

// get single player
const getSinglePlayer = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid player ID"});
    }

    // find player by id
    const player = await Player.findById(req.params.id);
    if (!player) {
        return res.status(404).json({error: "Player not found"});
    }
    
    return res.status(200).json({player});
} 

// get players by team
const getPlayersByTeam = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid team ID"});
    }

    // find team by id
    const team = await Team.find({_id: req.params.id});
    // find players by team name
    const players = await Player.find({teamName: team.name});
    if (!players) {
        return res.status(404).json({error: "Players not found"});
    }

    return res.status(200).json({players});
}

// add player
const addPlayer = async (req, res) => {
    const { firstName, lastName, picture, yearOfBirth, teamName, career } = req.body;

    // find team by name
    const team = await Team.findOne({name: teamName});
    // check if team exists
    if (!team) {
        return res.status(404).json({error: "Team not found"});
    }
    const currentTeamId = team._id;

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
        res.status(400).json({error: err.message});
    }
}

// update player
const updatePlayer = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid player ID"});
    }

    // grab player by id and update
    const player = await Player.findOneAndUpdate({_id: req.params.id}, {
        ...req.body
    })
    // check if player exists
    if (!player) {
        return res.status(404).json({error: "Player not found"});
    }

    return res.status(200).json({player});
}

// delete player
const deletePlayer = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid player ID"});
    }
    //grab player by id and delete
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
        return res.status(404).json({error: "Player not found"});
    }

    return res.status(200).json({player});
}

module.exports = {
    addPlayer,
    getAllPlayers,
    getSinglePlayer,
    deletePlayer,
    updatePlayer,
    getPlayersByTeam
}