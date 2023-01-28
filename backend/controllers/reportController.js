const Team = require('../models/teamModel');
const Player = require('../models/playerModel');
const Game = require('../models/gameModel');
const User = require('../models/userModel');
const mongoose = require('mongoose');
const { Parser } = require('json2csv');
// get report about how many users controll each player
const getPlayersReport = async (req, res) => {
    User.aggregate([
        {
            $unwind: "$auth_players"
        },
        {
            $group: {
                _id: "$auth_players",
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                player: "$_id",
                count: 1
            }
        }
    ])
    .then((result) => {
       res.status(200).json({result});
    }
    )
    .catch((err) => {
        res.status(400).json({error: err.message});
    }
    )
}

// get report about how many users controll each team
const getTeamsReport = async (req, res) => {
    User.aggregate([
        {
            $unwind: "$auth_teams"
        },
        {
            $group: {
                _id: "$auth_teams",
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                team: "$_id",
                count: 1
            }
        }
    ])
    .then((result) => {
         res.status(200).json({result});
    }
    )
    .catch((err) => {
        res.status(400).json({error: err.message});
    }
    )
}

// raport about how many users registered each month
const getUsersReport = async (req, res) => {
    User.aggregate([
        {
            $group: {
                _id: { $month: "$createdAt" },
                users: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                count: 1
            }
        }
    ])
    .then((result) => {
       res.status(200).json({result});
    }
    )
    .catch((err) => {
        res.status(400).json({error: err.message});
    }
    )
}


// report about how many games are being played each month
const getGamesReport = async (req, res) => {
    Game.aggregate([
        {
            $group: {
                _id: { $month: "$date" },
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                month: "$_id",
                count: 1
            }
        }
    ])
    .then((result) => {
         res.status(200).json({result});
    }
    )
    .catch((err) => {
        res.status(400).json({error: err.message});
    }
    )
}

// raport about how many players are in each team
const getPlayersInTeamsReport = async (req, res) => {
    Player.aggregate([
        {
            $group: {
                _id: "$team_id",
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                team: "$_id",
                count: 1
            }
        }

    ])
    .then((result) => {
        Promise.all(result.map((item) => {
            return Team.findById(item.team).then((team) => {
                item.team = team.name;
                return item;
            });
        })).then((updatedResult) => {
            res.status(200).json({result: updatedResult});
        });
    }
    )
    .catch((err) => {
        res.status(400).json({error: err.message});
    }
    )
}


// raport about how many games each team played (or will play)
const getGamesInTeamsReport = async (req, res) => {
    const result = await Game.aggregate([
        {
            $group: {
                _id: { $cond: [ { $eq: [ "$team1_id", mongoose.Types.ObjectId(req.params.teamId) ] }, "$team1_id", "$team2_id" ] },
                count: {$sum: 1}
            }
        },
        {
            $project: {
                _id: 0,
                team: "$_id",
                count: 1
            }
        }
    ]);
   res.status(200).json({result});
}





   
module.exports = {
    getPlayersReport,
    getTeamsReport,
    getUsersReport,
    getGamesReport,
    getPlayersInTeamsReport,
    getGamesInTeamsReport
}
    