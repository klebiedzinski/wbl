require('dotenv').config();
const multer = require('multer');
const express = require('express');
const mongoose = require('mongoose');
const teamsRoutes = require('./routes/teams');
const playersRoutes = require('./routes/players');
const userRoutes = require('./routes/user');
const gamesRoutes = require('./routes/games');
const cors = require('cors');

const app = express();

//enable all cors requests
app.use(
  cors({
    origin: '*',    
  })
);



//middleware
app.use(express.json());


//routes
app.use('/api/teams', teamsRoutes);
app.use('/api/players', playersRoutes);
app.use('/api/user', userRoutes);
app.use('/api/games', gamesRoutes);


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Db connected, Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });




