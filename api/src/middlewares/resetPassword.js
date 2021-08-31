const nodemailer = require('nodemailer');

export const sendEmail = async (email, subject, text, res) => {
    try{
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            service: process.env.EMAIL_SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        const sent = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        })

        if(sent){
            res.json({
                message: 'Email sent successfully'
            })
        }else{
            res.status(404).json({
                message: 'There was a problem sending the email'
            })
        }

    } catch(error){
        console.log(error, " Email not sent")
    }
}