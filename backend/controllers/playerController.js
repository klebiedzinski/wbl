const Player = require('../models/playerModel');
const Team = require('../models/teamModel');
const mongoose = require('mongoose');

//get all players
const getAllPlayers = async (req, res) => {
    try {
        const players = await Player.find({}).sort({ lastName: 1 });
        res.status(200).json({ players });
    } catch (err) {
        res.status(400).json({ error: error.message });
    }
};

// search players
const searchPlayers = async (req, res) => {
    const { search } = req.params;
    try {
        const players = await Player.find({
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
            ],
        }).sort({ lastName: 1 });
        res.status(200).json({ players });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// query players with pagination
const queryPlayers = async (req, res) => {
    const { search, page, limit } = req.query;
    try {
        const players = await Player.find({
            $or: [
                { firstName: { $regex: search, $options: 'i' } },
                { lastName: { $regex: search, $options: 'i' } },
            ],
        })
            .sort({ lastName: 1 })
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json({ players });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// get single player
const getSinglePlayer = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'Invalid player ID' });
    }

    // find player by id
    const player = await Player.findById(req.params.id);
    if (!player) {
        return res.status(404).json({ error: 'Player not found' });
    }

    return res.status(200).json({ player });
};

// get players by team
const getPlayersByTeam = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'Invalid team ID' });
    }

    // find team by id
    const team = await Team.findOne({ _id: req.params.id });
    // find players by team name
    const players = await Player.find({ team_id: team._id });
    if (!players) {
        return res.status(404).json({ error: 'Players not found' });
    }

    return res.status(200).json({ players });
};

// add player
const addPlayer = async (req, res) => {
    const { firstName, lastName, yearOfBirth, team_id, career } = req.body;

    // find team by name
    const team = await Team.findOne({ _id: team_id });
    // check if team exists
    if (!team) {
        return res.status(404).json({ error: 'Team not found' });
    }
    // add document to database
    try {
        const player = await Player.create({
            firstName,
            lastName,
            picture: req.file
                ? req.protocol +
                  '://' +
                  'wbl.klebiedzinski.pl/photos' +
                  '/uploads/' +
                  req.file.filename
                : `https://api.dicebear.com/5.x/micah/svg?seed=${lastName}${firstName}&earringsProbability=0&eyes=eyes,eyesShadow,round&facialHair[]&facialHairProbability=0&hair=fonze,mrClean,dougFunny&hairColor=000000,77311d,ac6651,ffedef,ffeba4,f4d150&mouth=laughing,smile,smirk&shirt=open&shirtColor=000000`,
            yearOfBirth,
            team_id,
            career,
        });
        res.status(200).json({ player });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// update player
const updatePlayer = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'Invalid player ID' });
    }
    // grab player by id and update
    const player = await Player.findOneAndUpdate(
        { _id: req.params.id },
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            picture: req.file
                ? req.protocol +
                  '://' +
                  'wbl.klebiedzinski.pl/photos' +
                  '/uploads/' +
                  req.file.filename
                : req.body.picture,
            yearOfBirth: req.body.yearOfBirth,
            team_id: req.body.team_id,
            career: req.body.career,
        }
    );

    // check if player exists
    if (!player) {
        return res.status(404).json({ error: 'Player not found' });
    }
    return res.status(200).json({ player });
};

// delete player
const deletePlayer = async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(404).json({ error: 'Invalid player ID' });
    }
    //grab player by id and delete
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
        return res.status(404).json({ error: 'Player not found' });
    }

    return res.status(200).json({ player });
};

module.exports = {
    addPlayer,
    getAllPlayers,
    getSinglePlayer,
    deletePlayer,
    updatePlayer,
    getPlayersByTeam,
    searchPlayers,
    queryPlayers,
};
