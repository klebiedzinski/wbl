const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false,
        default: "https://wbl.klebiedzinski.pl/photos/sample_pictures/player.png"
    },
    yearOfBirth: {
        type: String, 
        required: true
    },
    
    career: {
        type: Array,
        required: false
    },
    
    team_id: {
        type: String,
        required: false
    },

}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);