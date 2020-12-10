const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const app = express();
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

app.use(cors());
app.use(express.json());

app.post("/sendMail", (req, res) => {
  var { email, first_name, last_name, password, company } = req.body;

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "integral.agility.assessment@gmail.com",
        pass: "Agility123",
      },
    })
  );
  var mailOptions = {
    from: "integral.agility.assessment@gmail.com",
    to: email,
    subject: "Integral Assessment consultant notification",
    text: `${first_name} ${last_name} has been added by ${company} as a consultant your email ${email} and password is ${password}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json(error);
    } else {
      return res.json("Email sent: " + info.response);
    }
  });
});
app.post("/sendInvite", (req, res) => {
  var { email, consultant_name, assessment_name } = req.body;

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "integral.agility.assessment@gmail.com",
        pass: "Agility123",
      },
    })
  );
  var mailOptions = {
    from: "integral.agility.assessment@gmail.com",
    to: email,
    subject: "Integral Assessment invitation notification",
    text: `${consultant_name} has inivtited you to this ${assessment_name} join from here https://integralassessment.web.app/auth/signup`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return res.json(error);
    } else {
      return res.json("Email sent: " + info.response);
    }
  });
});
exports.app = functions.https.onRequest(app);
