require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const dayjs = require("dayjs");
const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(5124, () => {
  console.log("The server started on port 5124 !!!!!!");
});

app.get("/", (req, res) => {
  res.send("<h1> Working</h1>");
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let data = req.body;
  sendMail(data, (info) => {
    console.log(`The mail has beed send`);
    res.send(info);
  });
});
let userMail = process.env.USER;
let userPass = process.env.PASS;

async function sendMail(data, callback) {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
      user: userMail,
      pass: userPass,
    },
  });

  transporter.verify(function (error, success) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });
  // console.log(data);
  let info = await transporter.sendMail({
    from: '"Booking app 👻" <dragoshuniq@gmail.com>',
    to: `${data.bookPerson.email}`,
    subject: "Booking confirmation",
    text: "Hello world?",
    html: `<h3> Hi ${data.bookPerson.firstName}, Appointment confirmed with ${
      data.companyName
    } on ${dayjs(new Date(data.date)).format("dddd,MMMM	DD, YYYY")}, at ${dayjs(
      new Date(data.time)
    ).format("hh:mm a")}. Please find the details below.</h3><br>
    <br>
    <b>Service: ${data.serviceName}</b><br>
    <b>Price: ${data.price} RON </b><br>
    <b>Duration: ${data.duration} minutes </b>
    <br>
    <br>
    <i>Best wishes,<br>Booking app team! </i>`, // html body
  });

  callback(info);
}
