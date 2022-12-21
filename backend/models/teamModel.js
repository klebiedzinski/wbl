const mongoose = require('mongoose');
import playerModel from './playerModel';
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: false,
        default: "https://wbl.klebiedzinski.pl/photos/sample_pictures/wbl.png"

    },
    players: {
        type: [playerModel],
        required: false,
        default: []
    },
    games: {
        type: [gameModel],
        required: false,
        default: []
    },
    wins: {
        type: Number,
        required: false,
        default: 0
    },
    losses: {
        type: Number,
        required: false,
        default: 0
    },

}, { timestamps: true });
