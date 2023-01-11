const express = require('express');
const { addPlayer, getAllPlayers, getSinglePlayer, deletePlayer, updatePlayer, getPlayersByTeam } = require('../controllers/playerController');
const requireAuth = require('../middleware/requireAuth');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '../../photos/uploads/');
    },
    filename: (req, file, cb) => {
        //naming conventions (player or team)
      const fileName = req.body.firstName ? "player_" + req.body.firstName + req.body.lastName + ".png" 
        : "team_" + req.body.name + ".png";
      cb(null, fileName);
    },
  });
  
  const filefilter = (req, file, cb) => {
    if(file.mimetype === 'image/png'){
      cb(null, true);
    } else {
      cb(null, false);
    }
  }
  
  const upload = multer({storage: storage, fileFilter: filefilter});

//get all players
router.get('/', getAllPlayers);

//get single player
router.get('/:id', getSinglePlayer);

//get players by team
router.get('/team/:id', getPlayersByTeam);


//middleware to check role
router.use(requireAuth);

//add player
router.post('/', upload.single('picture'), addPlayer);

//update player
router.patch('/:id', upload.single('picture'), updatePlayer);

//delete player
router.delete('/:id', deletePlayer);

module.exports = router;