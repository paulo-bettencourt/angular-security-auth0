const express = require('express');
const port = 3000;
const cors = require('cors')
const app = express();
app.use(cors());
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const otpGenerator = require('otp-generator')
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');
app.use(fileUpload());
// GLOBAL VARIABLES

let otp;
const token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// NODEMAIL

const sgMail = require('@sendgrid/mail')
process.env['SENDGRID_API_KEY'] = process.env.SENDGRID_API_KEY;
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// SERVER SETUP

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// SERVER REQUESTS

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/login', (req, res) => {
  res.status(200).send({user: 'ok', pass: ''})
})

app.post('/signup', (req, res) => {
  const msg = {
    to: req.body.login, // Change to your recipient
    from: 'paulo.lemos@bringglobal.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    textClass: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }

  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })

  otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
  res.status(200).send({otp: otp})
})

app.post('/otp', (req, res) => {
  otp === req.body.otp ? res.status(200).send({token: token}) : res.status(400).send({message: 'bad request'});
})

app.post('/upload', function(req, res) {
  let file = '';
  let pathName = '';

  req.files.file ? file =  req.files.file : file =  req.files.image;
  req.files.file ? pathName = "/files/" : pathName = "/images/";

  console.log("PATH", pathName)

  const path = __dirname + pathName + file.name;

  file.mv(path, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send({ status: "success", path: path });
  });
});
