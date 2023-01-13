const express = require('express');
const { getAllGames, getSingleGame, addGame, updateGame, deleteGame, getGamesByTeam } = require('../controllers/gameController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//get all games
router.get('/', getAllGames);

//get all games by team
router.get('/team/:id', getGamesByTeam);

//get single game
router.get('/:id', getSingleGame);


router.use(requireAuth);

//add game
router.post('/', addGame);

//update game
router.patch('/:id', updateGame);


//delete game
router.delete('/:id', deleteGame);


module.exports = router;