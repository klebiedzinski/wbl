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
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    yearOfBirth: {
        type: Number,
        required: true
    },
    career: {
        type: Array,
        required: false

    }

}, { timestamps: true });

module.exports = mongoose.model('Player', playerSchema);