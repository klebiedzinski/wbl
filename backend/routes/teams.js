const express = require('express');
const { addTeam, getAllTeams, getSingleTeam, deleteTeam, updateTeam, addWin, addDefeat } = require('../controllers/teamController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//get all teams
router.get('/', getAllTeams);

//get single team
router.get('/:id', getSingleTeam);


router.use(requireAuth);

//add team
router.post('/', addTeam);

//update team
router.patch('/:id', updateTeam);

//delete team
router.delete('/:id', deleteTeam);

// //add win to team
// router.patch('/:id', addWin);

// //add defeat to team
// router.patch('/:id', addDefeat);


module.exports = router;