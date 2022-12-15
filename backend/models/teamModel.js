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
        default: "https://drive.google.com/file/d/1A-JJkijOkz-eIU2lMpIN9AaN6rP-n59r/view?usp=sharing"

    },
    players: {
        type: [playerModel],
        required: true,
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
