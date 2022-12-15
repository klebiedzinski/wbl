// require mongoose and team model
const mongoose = require('mongoose');
const teamModel = require('../models/teamModel');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    status: {
        type: "scheduled" | "live" | "done",
        required: false,
        default: "scheduled"
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
        required: true
    },
    location: {
        type: String,
        required: false,
        default: "TBD"
    }

}, { timestamps: true });
    
        