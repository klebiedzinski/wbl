const express = require('express');
const router = express.Router();
const { addTeam, getAllTeams, getSingleTeam, deleteTeam, updateTeam } = require('../controllers/teamController');

//get all teams
router.get('/', getAllTeams);

//get single team
router.get('/:id', getSingleTeam);

//add team
router.post('/', addTeam);

//update team
router.patch('/:id', updateTeam);

//delete team
router.delete('/:id', deleteTeam);

module.exports = router;