const nodemailer = require("nodemailer");
require("dotenv").config();

async function sendEmailUtility(EmailTo, EmailText, EmailSubject) {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_FROM,
            pass: process.env.MAIL_PASS,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    let mailOptions = {
        from: `Full-stack-crud-pro <${process.env.MAIL_FROM}>`,
        to: EmailTo,
        subject: EmailSubject,
        text: EmailText,
    };

    return await transporter.sendMail(mailOptions);
}
module.exports = sendEmailUtility;