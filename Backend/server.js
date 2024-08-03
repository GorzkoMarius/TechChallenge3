// i load up the express and body-parser modules
const express = require('express');
const bodyParser = require('body-parser');

// i created an instace of our server that will serve the endpoints we define
const app = express();

// i load up the inbuilt file system manager library from node and also the cors middleware to enable cross-origin resource sharing
const fs = require('fs');
const cors = require('cors');

// we use CORS middleware
const corsOptions = {
    origin: 'http://localhost:4200', // (https://your-client-app.com)
    optionsSuccessStatus: 200,
  };
 
app.use(cors(corsOptions));

// i am configuring the express instace to use the body-parser settings expecialy for handling the JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// i am configuring the routes for our endpoins
// i could have just put the code for the endpoints in the same file,
// but i chose to separe them for clarity and reusability
// i also launch the server on the port 3001
const routes = require('./routes/routes.js')(app, fs, cors, corsOptions);

const server = app.listen(3001, () => {
    console.log('the server is running on port %s...', server.address().port);
})