const randomString = require('randomstring');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        picture: {
            type: String,
            required: false,
            default: `https://api.dicebear.com/5.x/micah/svg?seed=Tinkerbell&earringsProbability=0&eyes=eyes,eyesShadow,round&facialHair[]&facialHairProbability=0&hair=mrClean,dougFunny&hairColor=000000,77311d,ac6651,ffedef,ffeba4,f4d150&mouth=laughing,smile,smirk&shirt=open&shirtColor=000000`,
        },
        yearOfBirth: {
            type: String,
            required: true,
        },

        career: {
            type: Array,
            required: false,
        },

        team_id: {
            type: String,
            required: false,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Player', playerSchema);
