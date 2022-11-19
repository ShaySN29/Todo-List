/* Controller contains the code to perform CRUD operations using Mongoose. */
const User = require('../models/users.model'); // import model
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secretKey = 'MySectretKey235657ggfDFe';

// addNewUser function below adds a user to the collection using the save() method
exports.addNewUser = (req, res) => {
    let userTemplate = new User({
        username: req.body.username,
        password: req.body.password
    });

    userTemplate.save( (error, data) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "There was an error while adding the user" })
        } else {
            console.log(data);
            res.json("The user has been added");
        }
    });
};

/* When the user enters the login details, the find method checks if the username is in the database
 if the username entered is equal to the username in the database, a jwt is generated and the token is sent as the response
 */
exports.loginUser = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    User.find({ username: username }, (error, user) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred." });
        } else {

            if (username === user[0].username && password == user[0].password) { 
                const payload = {
                    'username': user[0].username,
                    'admin': false
                };
                const token = jwt.sign(JSON.stringify(payload), secretKey,
                    {algorithm: 'HS256'});
                res.send( {'token': token} );
            } else {
                res.status(403).send( {'err': 'Incorrect login!'} );
            }
        }
    })
};

// Verifying the token
exports.resourceEndpoint = (req, res) => {
    const auth = req.headers['authorization']
    const token = auth.split(' ')[1]
    try {
        const decoded = jwt.verify(token, secretKey)
        res.send({
            'msg':
                `Hello, ${decoded.username}! Your JSON Web Token has been verified.`
        })
    } catch (err) {
        res.status(401).send({ 'err': 'Bad JWT!' })
    }
};

// Saving todo list to the database
exports.saveTodoListToDatabase = (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    let query = {username: decoded.username};

    User.findOneAndUpdate(query, {$set: {todoList: req.body.todoList}}, (error, data) => {
        if (error) {
            console.log("The ToDo List could not be saved");
            res.json("ERROR: Not Updated. " + error)
        }
        res.json("Your ToDo List has been saved")
    });
};

// Retrieving the todoList from the database
exports.getTodoListFromDatabase = (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];
    const decoded = jwt.verify(token, secretKey);
    let query = { username: decoded.username };

    User.findOne(query, { username: false, password: false, _id:false, __v:false }, (error, todoList) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: "Some error occurred while finding the ToDoList." });
        } else {
            res.json(todoList.todoList);
        }
    });
};
