'use strict';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'wloclawskabasketliga@gmail.com',
        pass: 'nrxrclddahwxllil',
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

const mailData = {
    from: 'wloclawskabasketliga@gmail.com',
    subject: 'Potwierdzenie rejestracji',
}

module.exports = {transporter,mailData};