import nodemailer from "nodemailer";

export const sendVerificationEmail = (token, email, name) => {
  /* pfwf exph doup cwaz  iegb gntw poly rvyx
       sensational.bilal@gmail.com
    */
  const html = `
            <html>
                <body style="background-color: #e8e8e8; border-radius: 10px;">
                    <div style="padding: 25px">
                    <h3>Dear ${name}</h3>
                    <p>Thanks for signing up at Daily Dose</p>
                    <p>Use the link below to verify your email</p>
                    <a href="http://localhost:3000/email-verify/${token}">Click here!</a>
                    </div>
                </body>
            </html>
    `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "sufyanshoukat2122@gmail.com",
      pass: "xsqc xtue ffgx ooji",
    },
  });

  const mailOptions = {
    from: "sufyanshoukat2122@gmail.com",
    to: email,
    subject: "Verify your email address",
    html: html,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email send to ${email}`);
      console.log(info.response);
    }
  });
};
