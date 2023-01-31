const express = require('express');
const port = 3000;
const cors = require('cors')
const app = express();
app.use(cors());
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// NODEMAIL

const sgMail = require('@sendgrid/mail')
// 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

process.env['SENDGRID_API_KEY'] = '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';
console.log("PROCESSO", process.env.SENDGRID_API_KEY)
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

  console.log("--->", req.body)

  const msg = {
    to: req.body.login, // Change to your recipient
    from: 'paulo.lemos@bringglobal.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
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

  res.status(200).send({user: 'ok', pass: ''})
})
