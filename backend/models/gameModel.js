const mongoose = require('mongoose');
const teamModel = require('../models/teamModel');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    status: {
        type: String,
        required: false,
        default: "scheduled" // scheduled, live, finished
    },
    team1: {
        type: teamModel,
        required: true
    },
    team2: {
        type: teamModel,
        required: true
    },
    team1Score: {
        type: Number,
        required: false,
        default: 0
    },
    team2Score: {
        type: Number,
        required: false,
        default: 0
    },
    date: {
        type: Date,
        required: false,
        // default: new Date()
    },
    location: {
        type: String,
        required: false,
        default: "ONZ Arena"
    }

}, { timestamps: true });
    
        