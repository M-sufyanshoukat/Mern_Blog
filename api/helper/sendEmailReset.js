import nodemailer from "nodemailer";

export const sendPasswordResetEmail = (token, email, name) => {
  const html = `
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h3 {
        color: #333;
      }
      p {
        color: #666;
      }
       a {
      display: inline-block;
    padding: 10px 20px;
      
        color: white;

  border-radius: 5px;
   }
  a:hover {
    background-color: #0056b3;
    color: white;
   }
   a {
    color: white;
  }
    </style>
  </head>
  <body>
    <div class="container">
      <h3>Dear ${name},</h3>
      <p>Please click on the link below to reset your password.</p>
      <a   href="http://localhost:5173/password-reset/${token}">Click here!</a>
    </div>
  </body>
  </html>`;

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
    subject: "Dail Dose: Reset your password request.",
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
