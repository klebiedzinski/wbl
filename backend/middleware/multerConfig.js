const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      //if production
      // ??????
      
      //if development
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

    module.exports = upload;