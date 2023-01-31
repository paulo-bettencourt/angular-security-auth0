const express = require('express');
const port = 3000;
const cors = require('cors')
const app = express();
app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('hello world')
})

app.post('/login', (req, res) => {



  res.status(200).send({user: 'ok', pass: ''})
})
