const Team = require('../models/teamModel');
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
        return res.status(404).json({error: "Invalid team ID"});
    }
    // find team by id
    const team = await Team.findById(req.params.id);
    if (!team) {
        return res.status(404).json({error: "Team not found"});
    }
    
    return res.status(200).json({team});
        
}

// add team
const addTeam = async (req, res) => {
    const {name, logo} = req.body;

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
        return res.status(404).json({error: "Invalid team ID"});
    }

    // grab team by id and update
    const team = await Team.findOneAndUpdate({_id: req.params.id},{...req.body});
    if (!team) {
        return res.status(404).json({error: "Team not found"});
    }
    return res.status(200).json({team});
}

// delete team
const deleteTeam = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid team ID"});
    }

    // grab team by id and delete
    const team = await Team.findOneAndDelete({_id: req.params.id});
    if (!team) {
        return res.status(404).json({error: "Team not found"});
    }
    
    return res.status(200).json({team});
}

module.exports = {
    getAllTeams,
    getSingleTeam,
    addTeam,
    updateTeam,
    deleteTeam
}
