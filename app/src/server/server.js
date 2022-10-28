// server.js
'use strict'

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express()
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});

app.post('/', (req, res) => {
  console.log('Received request');
  fs.writeFile('src/app/sampleData.json', JSON.stringify(req.body), (err) => {
    if (err) throw err;
    console.log('File written to sampleData.json', req.body);
  })
});

app.listen(3000, ()=>{
  console.log('Listening on port 3000. Post a file to http://localhost:3000 to save to /JSON.json');
});