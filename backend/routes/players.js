const express = require('express');
const router = express.Router();

//get all players
router.get('/', (req,res) => {
    res.json({mssg: "Get all players"});
});

//get single player
router.get('/:id', (req,res) => {
    res.json({mssg: "Get single player"});
});

//add player
router.post('/', async (req,res) => {

});

//update player
router.patch('/:id', (req,res) => {
    res.json({mssg: "Update player"});
});

//delete player
router.delete('/:id', (req,res) => {
    res.json({mssg: "Delete player"});
});

module.exports = router;