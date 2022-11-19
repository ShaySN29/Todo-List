/* Model below created using the model() method. The model handles the creation and retrieval of documents from the database */
const mongoose = require('mongoose'); 

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    todoList: {
        type: Array,
    }
});

// The Name of the model and the schema object created passed as arguments
module.exports = mongoose.model('User', UserSchema);