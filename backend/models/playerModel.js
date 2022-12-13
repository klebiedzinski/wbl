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
        required: false
    },
    yearOfBirth: {
        type: Number,
        required: true
    },
    currentTeamId: {
        type: String,
        required: false
    },
    career: {
        type: Array,
        required: false
    }

}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);