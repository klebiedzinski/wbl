const Game = require('../models/gameModel');
const mongoose = require('mongoose');

//get all games
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({}).sort({date: 1})
        res.status(200).json({games});
    } catch (err) {
        res.status(400).json({error: error.message});
    }
}

// get single game
const getSingleGame = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid game ID"});
    }
    // find game by id
    const game = await Game.findById(req.params.id);
    if (!game) {
        return res.status(404).json({error: "game not found"});
    }
    
    return res.status(200).json({game});
        
}

// add game
const addGame = async (req, res) => {
    const {status, team1_id, team2_id, team1Score, team2Score, date, location} = req.body;
    // add game to database
    try {
        const game = await Game.create({
            status,
            team1_id,
            team2_id,
            team1Score,
            team2Score,
            date,
            location
        });
        res.status(200).json({game});
    }
    catch (err) {
        res.status(400).json({error: err.message});
    }
}

// update game
const updateGame = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid game ID"});
    }

    // grab game by id and update
    const game = await Game.findOneAndUpdate({_id: req.params.id},{...req.body});
    if (!game) {
        return res.status(404).json({error: "game not found"});
    }
    return res.status(200).json({game});
}

// delete game
const deleteGame = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid game ID"});
    }

    // grab game by id and delete
    const game = await Game.findOneAndDelete({_id: req.params.id});
    if (!game) {
        return res.status(404).json({error: "Game not found"});
    }
    
    return res.status(200).json({game});
}

module.exports = {
    getAllGames,
    getSingleGame,
    addGame,
    updateGame,
    deleteGame
}

