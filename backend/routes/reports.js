const express = require('express');
const router = express.Router();
const { getPlayersReport, getTeamsReport, getUsersReport, getGamesReport, getPlayersInTeamsReport, getGamesInTeamsReport } = require('../controllers/reportController.js');



router.get('/players', getPlayersReport);

router.get('/teams', getTeamsReport);

router.get('/users', getUsersReport);

router.get('/games', getGamesReport);

router.get('/playersInTeams', getPlayersInTeamsReport);

router.get('/gamesInTeams', getGamesInTeamsReport);


module.exports = router;