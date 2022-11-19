const express = require("express");
const router = express.Router();
const {addNewUser, loginUser, resourceEndpoint, saveTodoListToDatabase, getTodoListFromDatabase} = require("../controllers/users.controller");

router.post("/add", addNewUser);

router.post("/login", loginUser);

router.get("/resource", resourceEndpoint);

router.put("/savetodo", saveTodoListToDatabase);

router.get("/gettodolist", getTodoListFromDatabase);

module.exports = router;