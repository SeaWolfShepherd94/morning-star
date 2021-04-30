// import files and modules
const myApp = require('./api/app');
const serverless = require('serverless-http');
const express = require('express')
const example = require('./api/example');

const app = express()

// set routes for serverless functions
app.get('/', (req, res) => { res.send("Hello World!") })

app.get('/example', example.get)

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/app', myApp.donors)

module.exports.handler = serverless(app);
