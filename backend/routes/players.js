const express = require('express');
const { addPlayer,searchPlayers, getAllPlayers, getSinglePlayer, deletePlayer, updatePlayer, getPlayersByTeam, queryPlayers } = require('../controllers/playerController');
const requireAuth = require('../middleware/requireAuth');
const upload = require('../middleware/multerConfig');
const router = express.Router();



//get all players
// router.get('/', getAllPlayers);

router.get('/', getAllPlayers);

// query players with pagination
router.get('/query', queryPlayers);

//get single player
router.get('/:id', getSinglePlayer);

//get players by team
router.get('/team/:id', getPlayersByTeam);

//search players
router.get('/search/:search', searchPlayers);


//middleware to check role
router.use(requireAuth);

//add player
router.post('/', upload.single('picture'), addPlayer);

//update player
router.patch('/:id', upload.single('picture'), updatePlayer);

//delete player
router.delete('/:id', deletePlayer);

module.exports = router;