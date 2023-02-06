//use node mailer to send email when user signs up

const { transporter, mailData } = require('./mailConfig');
const { createMessage } = require('./verifyMailTemplate');

const signupMail = async (receiver, id) => {
    const mailTemplate = {
        ...mailData,
        to: receiver,
        html: createMessage(id),
    };

    try {
        await transporter.sendMail(mailTemplate);
        return { message: 'Mail sent', status: 200 };
    } catch (error) {
        console.log(error.message);
        return { message: error.message, status: 500 };
    }
};

module.exports = { signupMail };
