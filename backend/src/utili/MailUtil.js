const mailer = require('nodemailer');

///function

const sendingMail = async(to,subject,text) => {
    const transporter = mailer.createTransport({
        service: 'gmail',
        auth:{
            user:"microsoftsuperman@gmail.com",
            pass:"woiv cfmc umrc qbij"
        }
    })

    let htmlContent = `
        <html>
            <body style="font-family: Arial, sans-serif; color: #333; background-color:rgb(238, 104, 104); padding: 20px;">
                <div style="max-width: 600px; margin: 0 auto; background-color:rgb(204, 97, 97); padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #2c3e50; text-align: center;">Welcome to Our Platform!</h2>
                    <p style="font-size: 16px; color: #555;">
                        Hi there,<br><br>
                        We're excited to have you on board! Thank you for joining us. We look forward to offering you the best services and helping you achieve your goals.<br><br>
                        If you have any questions or need assistance, feel free to reach out to us anytime.<br><br>
                        Best regards,<br>
                        <strong>Your Company Team</strong>
                    </p>
                    <hr>
                    <p style="font-size: 12px; color: #aaa; text-align: center;">
                        This is an automated email. Please do not reply to this message.
                    </p>
                </div>
            </body>
        </html>
    `;

    const mailOptions = {
        from: 'microsoftsuperman@gmail.com',
        to: to,
        subject: subject,
        //text: text
        html:htmlContent
    }

    const mailresponse = await transporter.sendMail(mailOptions);
    console.log(mailresponse);
    return mailresponse;

}

module.exports ={
    sendingMail
}

//sendingMail("microsoftsuperman@gmail.com","Test Mail","this is test mail")





// const nodemailer = require('nodemailer');

// async function sendingMail(to, subject, textContent) {
//     // Create a transporter using Gmail's service
//     let transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: "microsoftsuperman@gmail.com",
//             pass: "woiv cfmc umrc qbij",
//         },
//     });

//     // HTML content with welcome message and formatting
//     let htmlContent = `
//         <html>
//             <body style="font-family: Arial, sans-serif; color: #333; background-color:rgb(238, 104, 104); padding: 20px;">
//                 <div style="max-width: 600px; margin: 0 auto; background-color:rgb(116, 86, 86); padding: 30px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
//                     <h2 style="color: #2c3e50; text-align: center;">Welcome to Our Platform!</h2>
//                     <p style="font-size: 16px; color: #555;">
//                         Hi there,<br><br>
//                         We're excited to have you on board! Thank you for joining us. We look forward to offering you the best services and helping you achieve your goals.<br><br>
//                         If you have any questions or need assistance, feel free to reach out to us anytime.<br><br>
//                         Best regards,<br>
//                         <strong>Your Company Team</strong>
//                     </p>
//                     <hr>
//                     <p style="font-size: 12px; color: #aaa; text-align: center;">
//                         This is an automated email. Please do not reply to this message.
//                     </p>
//                 </div>
//             </body>
//         </html>
//     `;

//     let info = await transporter.sendMail({
//         from: 'microsoftsuperman@gmail.com', // sender address
//         to: to, // list of receivers
//         subject: subject, // Subject line
//         text: textContent, // plain text version of the message
//         html: htmlContent, // html body
//     });

//     console.log('Message sent: %s', info.messageId);
// }

// // Example usage
// // sendingMail("aryansathvara35@gmail.com", "Welcome to Our Platform", "Welcome to to onboarding to you on our internship program. We are happy to have you with us.");
