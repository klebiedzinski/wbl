const express = require('express');
const { addPlayer, getAllPlayers, getSinglePlayer, deletePlayer, updatePlayer, getPlayersByTeam } = require('../controllers/playerController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//get all players
router.get('/', getAllPlayers);

//get single player
router.get('/:id', getSinglePlayer);

//get players by team
router.get('/team/:id', getPlayersByTeam);


//middleware to check role

//add player
router.post('/', addPlayer);

//update player
router.patch('/:id', updatePlayer);

//delete player
router.delete('/:id', deletePlayer);

module.exports = router;