'use strict';
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'wloclawskabasketliga@gmail.com',
        pass: 'rqsrpdmqjvjgezjl',
    },
});

const mailData = {
    from: 'wloclawskabasketliga@gmail.com',
    subject: 'Potwierdzenie rejestracji',
}

module.exports = {transporter,mailData};