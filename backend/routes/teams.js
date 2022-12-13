const express = require('express');
const router = express.Router();

//get all teams
router.get('/', (req,res) => {
    res.json({mssg: "Get all teams"});
});

//get single team
router.get('/:id', (req,res) => {
    res.json({mssg: "Get single team"});
});

//add team
router.post('/', (req,res) => {
    res.json({mssg: "Add team"});
});

//update team
router.patch('/:id', (req,res) => {
    res.json({mssg: "Update team"});
});

//delete team
router.delete('/:id', (req,res) => {
    res.json({mssg: "Delete team"});
});

module.exports = router;