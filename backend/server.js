require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const teamsRoutes = require('./routes/teams');
const playersRoutes = require('./routes/players');
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




