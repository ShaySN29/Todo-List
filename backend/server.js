const express = require("express");
const bodyParser = require("body-parser");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const cors = require('cors');
const morgan = require('morgan');
const routes = require("./routes/routes");
const app = express();
const port = 8000;

// Connecting mongoose to the database
const uri = 'mongodb+srv://shanayNair:JNg6Y4Hcgbw8PjW@hyperiondevsh2205000310.6hu9pmx.mongodb.net/?retryWrites=true&w=majority';
mongoose.Promise = global.Promise;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'task9' // Connects to the task9 DB
})
mongoose.connection.on('error', function () {
    console.log("Could not connect to the database. Exiting now.");
    process.exit();
})
mongoose.connection.once('open', function () {
    console.log("Successfully connected to the database");
})

// App Middleware 
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use("/", routes)

app.listen(port, () => {
    console.log("Server is online")
});