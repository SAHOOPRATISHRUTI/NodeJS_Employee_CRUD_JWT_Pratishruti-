const nodemailer = require('nodemailer')


const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user: `${process.env.USER_EMAIL}`,
        pass: `${process.env.USER_PASSWORD}`,
    }
});

const mailOptions = {
    from:`${process.env.USER_EMAIL}`,
    to:'',
    subject:"Your OTP for Verification",
    html:'<b>Welcome to My App !!! </b>',
    attachments: []
}
module.exports = {transporter, mailOptions};