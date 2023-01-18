const Team = require('../models/teamModel');
const Player = require('../models/playerModel');
const Game = require('../models/gameModel');
const mongoose = require('mongoose');

//get all teams
const getAllTeams = async (req, res) => {
    try {
        const teams = await Team.find({}).sort({name: 1})
        res.status(200).json({teams});
    } catch (err) {
        res.status(400).json({error: error.message});
    }
}

// get single team
const getSingleTeam = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Nie mogłem znaleźć drużyny, niepoprawne ID"});
    }
    // find team by id
    const team = await Team.findById(req.params.id);
    if (!team) {
        return res.status(404).json({error: "Nie znaleziono drużyny"});
    }
    
    return res.status(200).json({team});
        
}

// add team
const addTeam = async (req, res) => {
    const {name, logo} = req.body;

    // check if team exists
    const teamExists = await Team.findOne({name});
    console.log(teamExists)
    if (teamExists) {
        return res.status(400).json({error: "Drużyna o takiej nazwie już istnieje"});
    }
    // add team to database
    try {
        const team = await Team.create({
            name,
            logo
        });
        res.status(200).json({team});
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

// update team
const updateTeam = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Nie mogłem zaktualizować drużyny, niepoprawne ID"});
    }
    const team = await Team.findOneAndUpdate({_id: req.params.id},{
        name: req.body.name,
        logo: req.body.logo,
        teamPicture: 
            req.file ? req.protocol + '://' + "wbl.klebiedzinski.pl/photos" + '/uploads/' + req.file.filename 
                : "https://wbl.klebiedzinski.pl/photos/sample_pictures/wbl.png"
    });
    if (!team) {
        return res.status(404).json({error: "Nie znaleziono drużyny"});
    }
    return res.status(200).json({team});
}

// delete team
const deleteTeam = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Nie mogłem usunąć drużyny, niepoprawne ID drużyny"});
    }

    // grab team by id and delete
    const team = await Team.findOneAndDelete({_id: req.params.id});
    if (!team) {
        return res.status(404).json({error: "Nie znaleziono drużyny"});
    }

    // delete all games with this team
    const games = await Game.deleteMany({$or: [{team1_id: req.params.id}, {team2_id: req.params.id}]});
    
    // delete all players playing for this team
    const players = await Player.deleteMany({team_id: team._id});

    
    return res.status(200).json({team});
}

module.exports = {
    getAllTeams,
    getSingleTeam,
    addTeam,
    updateTeam,
    deleteTeam
}




