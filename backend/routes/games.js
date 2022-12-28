const express = require('express');
const router = express.Router();

//get all games
router.get('/', (req,res) => {
    res.json({mssg: "Get all games"});
});

//get single game
router.get('/:id', (req,res) => {
    res.json({mssg: "Get single game"});
});

//add game
router.post('/', (req,res) => {
    res.json({mssg: "Add game"});
});

//update game
router.patch('/:id', (req,res) => {
    res.json({mssg: "Update game"});
});


//delete game
router.delete('/:id', (req,res) => {
    res.json({mssg: "Delete game"});
});


module.exports = router;