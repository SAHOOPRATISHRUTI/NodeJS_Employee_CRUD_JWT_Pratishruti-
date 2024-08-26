const {transporter, mailOptions} = require('../emailSetUp/mailSetUp')

//function to dend email to user
const sendEmail = async(email,emailSubject,mailData,attachedFileDetails=[])=>{
    const mailOptionsInfo = {
        from: mailOptions,
        to: email,
        subject: emailSubject,
        html: mailData,
        attachments: attachedFileDetails,
      };
        const isSuccess = await transporter.sendMail(mailOptionsInfo);
        return isSuccess;
    };
    
    module.exports = {
      sendEmail,
    };