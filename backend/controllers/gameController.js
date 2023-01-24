const Game = require('../models/gameModel');
const Team = require('../models/teamModel');
const mongoose = require('mongoose');

//get all games
const getAllGames = async (req, res) => {
    try {
        const games = await Game.find({}).sort({date: 1})
        res.status(200).json({games});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//get 10 last games
const getLastGames = async (req, res) => {
    try {
        
        const count = await Game.countDocuments();
        const games = await Game.find({}).sort({date: -1, _id: 1}).limit(10)
        res.status(200).json({games, count});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

//load 10 more games
const loadMoreGames = async (req, res) => {
    try {
        const games = await Game.find({}).sort({date: -1, _id: 1}).skip(req.params.skip).limit(10)
        res.status(200).json({games});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}


// filter games by status and date range (from-to) with pagination
const filterGames = async (req, res) => {
    const { status: statusCheck, from, to, page, limit } = req.query;
    const fromFormat = new Date(from);
    const toFormat = new Date(to);
    const status = statusCheck === "wszystkie" ? {$in: ["scheduled", "live", "finished"]} : statusCheck;
    try {
        const games = await Game.find({
            $or: [
                { date: { $gte: fromFormat, $lte: toFormat } },
                {
                    $expr: {
                        $eq: [
                            { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
                            { $dateToString: { format: "%Y-%m-%d", date: fromFormat } }
                        ]
                    }
                }
            ]
        }).find({status: status}).sort({date: 1}).skip((page - 1) * limit).limit(limit);
        res.status(200).json({games});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
    
}



// get games by team
const getGamesByTeam = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid team ID"});
    }

    // find team by id
    const team = await Team.findOne({_id: req.params.id});
    // find games by team name
    const games = await Game.find({$or: [{team1_id: team._id}, {team2_id: team._id}]});
    if (!games) {
        return res.status(404).json({error: "Games not found"});
    }

    return res.status(200).json({games});
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
        if (status==="finished") {
            const winner = team1Score > team2Score ? team1_id : team2_id;
            const looser = team1Score < team2Score ? team1_id : team2_id;
            const winnersPoints = team1Score > team2Score ? team1Score : team2Score;
            const looserPoints = team1Score < team2Score ? team1Score : team2Score;
            //handling winner
            if (!mongoose.Types.ObjectId.isValid(winner)) {
                return res.status(404).json({error: "Nie mogłem dodać zwycięstwa, niepoprawne ID drużyny"});
            }
            // grab team by id and update wins, games, points_made and points_lost
            const winningTeam = await Team.findOneAndUpdate({_id: winner},
                {$inc: {wins: 1, games: 1, points_made: winnersPoints, points_lost: looserPoints}});
            if (!winningTeam) {
                return res.status(404).json({error: "Nie znaleziono drużyny"});
            }
            
            //handling looser
            if (!mongoose.Types.ObjectId.isValid(looser)) {
                return res.status(404).json({error: "Nie mogłem dodać przegranej, niepoprawne ID drużyny"});
            }

            // grab team by id and update losses, games, points_made and points_lost
            const loosingTeam = await Team.findOneAndUpdate({_id: looser},
                {$inc: {losses: 1, games: 1, points_made: looserPoints, points_lost: winnersPoints}});
            if (!loosingTeam) {
                return res.status(404).json({error: "Nie znaleziono drużyny"});
            }
        }

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
    const oldGame = await Game.findOne({_id: req.params.id});
    
    const newGame = await Game.findOneAndUpdate({_id: req.params.id},{...req.body}, {new: true});
    if (!newGame) {
        return res.status(404).json({error: "game not found"});
    }
    // IF YOU CHANGE STATUS FROM FINISHED TO FINISHED
    if (req.body.status==="finished" && oldGame.status==="finished") {
        const team1OldScore = oldGame.team1Score;
        const team2OldScore = oldGame.team2Score;
        const team1NewScore = req.body.team1Score;
        const team2NewScore = req.body.team2Score;
        const winner = team1NewScore > team2NewScore ? newGame.team1_id : newGame.team2_id;
        const looser = team2NewScore > team1NewScore ? newGame.team1_id : newGame.team2_id;
        const winnersPoints = team1NewScore > team2NewScore ? team1NewScore : team2NewScore;
        const looserPoints = team1NewScore < team2NewScore ? team1NewScore : team2NewScore;
        const oldWinner = team1OldScore > team2OldScore ? oldGame.team1_id : oldGame.team2_id;
        const oldLooser = team1OldScore < team2OldScore ? oldGame.team1_id : oldGame.team2_id;
        const oldWinnersPoints = team1OldScore > team2OldScore ? team1OldScore : team2OldScore;
        const oldLooserPoints = team1OldScore < team2OldScore ? team1OldScore : team2OldScore;

        //REMOVING OLD DATA FROM TEAMS
        const oldWinningTeam = await Team.findOneAndUpdate({_id: oldWinner},
            {$inc: {wins: -1, games: -1, points_made: -oldWinnersPoints, points_lost: -oldLooserPoints}});
        if (!oldWinningTeam) {
            return res.status(404).json({error: "Nie znaleziono drużyny"});
        }
        const oldLoosingTeam = await Team.findOneAndUpdate({_id: oldLooser},
            {$inc: {losses: -1, games: -1, points_made: -oldLooserPoints, points_lost: -oldWinnersPoints}});
        if (!oldLoosingTeam) {
            return res.status(404).json({error: "Nie znaleziono drużyny"});
        }

        //ADDING NEW DATA TO TEAMS
        if (!mongoose.Types.ObjectId.isValid(winner)) {
            return res.status(404).json({error: "Nie mogłem dodać zwycięstwa, niepoprawne ID drużyny"});
        }
        // grab team by id and update wins, games, points_made and points_lost
        const winningTeam = await Team.findOneAndUpdate({_id: winner},
            {$inc: {wins: 1, games: 1, points_made: winnersPoints, points_lost: looserPoints}});
        if (!winningTeam) {
            return res.status(404).json({error: "Nie znaleziono drużyny"});
        }

        const loosingTeam = await Team.findOneAndUpdate({_id: looser},
            {$inc: {losses: 1, games: 1, points_made: looserPoints, points_lost: winnersPoints}});
        if (!loosingTeam) {
            return res.status(404).json({error: "Nie znaleziono drużyny"});
        }


    }
    // IF YOU CHANGE STATUS FROM SCHEDULED TO FINISHED
    if (req.body.status==="finished" && oldGame.status==="scheduled") {
        const team1NewScore = req.body.team1Score;
        const team2NewScore = req.body.team2Score;
        const winner = team1NewScore > team2NewScore ? newGame.team1_id : newGame.team2_id;
        const looser = team2NewScore > team1NewScore ? newGame.team1_id : newGame.team2_id;
        const winnersPoints = team1NewScore > team2NewScore ? team1NewScore : team2NewScore;
        const looserPoints = team1NewScore < team2NewScore ? team1NewScore : team2NewScore;

        if (!mongoose.Types.ObjectId.isValid(winner)) {
            return res.status(404).json({error: "Nie mogłem dodać zwycięstwa, niepoprawne ID drużyny"});
        }
        // grab team by id and update wins, games, points_made and points_lost
        const winningTeam = await Team.findOneAndUpdate({_id: winner},
            {$inc: {wins: 1, games: 1, points_made: winnersPoints, points_lost: looserPoints}});
        if (!winningTeam) {
            return res.status(404).json({error: "Nie znaleziono drużyny"});
        }

        const loosingTeam = await Team.findOneAndUpdate({_id: looser},
            {$inc: {losses: 1, games: 1, points_made: looserPoints, points_lost: winnersPoints}});
        if (!loosingTeam) {
            return res.status(404).json({error: "Nie znaleziono drużyny"});
        }


    }

    return res.status(200).json({newGame});
}

// delete game
const deleteGame = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({error: "Invalid game ID"});
    }

    // grab game by id 
    const game = await Game.findOne({_id: req.params.id});
    if (!game) {
        return res.status(404).json({error: "Game not found"});
    }
    // if game is finished
    if (game.status === "finished") {
    const winner = game.team1Score > game.team2Score ? game.team1_id : game.team2_id;
    const looser = game.team2Score > game.team1Score ? game.team1_id : game.team2_id;
    const winnersPoints = game.team1Score > game.team2Score ? game.team1Score : game.team2Score;
    const looserPoints = game.team1Score < game.team2Score ? game.team1Score : game.team2Score;

    //grab team by id and update wins, games, points_made and points_lost
    const winningTeam = await Team.findOneAndUpdate({_id: winner},
        {$inc: {wins: -1, games: -1, points_made: -winnersPoints, points_lost: -looserPoints}});
    if (!winningTeam) {
        return res.status(404).json({error: "Nie znaleziono drużyny"});
    }

    const loosingTeam = await Team.findOneAndUpdate({_id: looser},
        {$inc: {losses: -1, games: -1, points_made: -looserPoints, points_lost: -winnersPoints}});
    if (!loosingTeam) {
        return res.status(404).json({error: "Nie znaleziono drużyny"});
    }
    }
    // delete game
    await Game.deleteOne({_id: req.params.id});
    return res.status(200).json({game});
}

module.exports = {
    getAllGames,
    getSingleGame,
    addGame,
    updateGame,
    deleteGame,
    getGamesByTeam,
    getLastGames,
    loadMoreGames,
    filterGames
}

