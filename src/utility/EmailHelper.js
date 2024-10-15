const nodemailer=require('nodemailer');

const sendEmail=async (EmailTo, EmailSubject, EmailText) => {
    const transporter = nodemailer.createTransport({
        host:"mail.teamrabbil.com",
        port:25,
        secure:false,
        auth:{user:"info@teamrabbil.com",pass:"~sR4[bhaC[Qs"},
        tls:{rejectUnauthorized:false} 
    });

    const mailOptions = {
        from:'MERN Ecommerce app <info@teamrabbil.com>',
        to:EmailTo,
        subject:EmailSubject,
        text:EmailText

    };

    return await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;