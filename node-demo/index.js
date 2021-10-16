const express = require ("express");
const helmet = require('helmet');
const morgan = require('morgan');
const logger = require ("./middleware/logger");
const course = require('./routes/course');
const Joi = require('joi');  // capital J is used because joi returns a class
const app = express();

app.use(express.json()); // req.body
app.use(express.urlencoded({extended: true})) // key=value&key=value (one of an old method) use form URL encoded in postman to send request
app.use(express.static('public'));
app.use(helmet());
app.use(morgan('tiny'));

app.use (logger);
app.use('api/courses', course);

console.log(`NODE_ENV=${process.env.NODE_ENV}`);
console.log(`app=${app.get('env')}`);

app.use (function (req, res, next) {
    console.log("Authenticating....");
    next();
})

// environment variable env. this is the proper way of defining the port. Here process is a goble variable.
// to change the port in termial we can use "set PORT = 5000"
const port = process.env.PORT || 4000; 
app.listen(port, () => console.log(`server start in port ${port}...`));
