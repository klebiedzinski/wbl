const mongoose = require('mongoose');
const playerModel = require('./playerModel');
const gameModel = require('./gameModel');
const Schema = mongoose.Schema;

const teamSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        logo: {
            type: String,
            required: false,
            default:
                'https://wbl.klebiedzinski.pl/photos/sample_pictures/wbl.png',
        },
        teamPicture: {
            type: String,
            required: false,
            default:
                'https://wbl.klebiedzinski.pl/photos/sample_pictures/wbl.png',
        },
        wins: {
            type: Number,
            required: false,
            default: 0,
        },
        losses: {
            type: Number,
            required: false,
            default: 0,
        },
        games: {
            type: Number,
            required: false,
            default: 0,
        },
        points_made: {
            type: Number,
            required: false,
            default: 0,
        },
        points_lost: {
            type: Number,
            required: false,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Team', teamSchema);
