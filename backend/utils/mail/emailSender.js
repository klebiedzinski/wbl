//use node mailer to send email when user signs up

const {transporter,mailData} = require("./mailConfig")
const {createMessage} = require("./verifyMailTemplate");

const signupMail = async (receiver, id) => {
    console.log("siema z wysylacza")
    const mailTemplate = {
        ...mailData,
        to: receiver,
        html: createMessage(id)
    }

    console.log("siema to jest mail template", mailTemplate) 
    try {
        console.log("siema zara wysylamy")
        await transporter.sendMail(mailTemplate);
        console.log("siema wyslano")
        return {message: 'Mail sent', status: 200}
    } catch (error) {
        console.log("siema nie wyslano")
        console.log(error.message)
            return {message: error.message, status: 500}
    }
}

module.exports = {signupMail};