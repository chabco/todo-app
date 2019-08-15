// const http = require('http');
// replace with express
const express = require('express');

const Todo = require('./models/Todo');
const User = require('./models/user');

// Create the server and call it "app"
const app = express();
// Create a variable for the port#
const port = 3000;

// const server = http.createServer((req, res) => {
// Replace with app.get()
app.get('/todos', async (req, res) => {

    // "debugger" keyword adds a programmatic breakpoint for the Chrome Dev Tools:

    // debugger;

    console.log('you have a request!');
    const allTodos = await Todo.getAll();
    // allTodos
    //     .then((data) => {
    //         console.log("OMG IT'S DATAZZZ")
    //         console.log(data);
            // const dataJSON = JSON.stringify(data);
            // res.end(dataJSON);
    res.json(allTodos);
        // });
});

app.get('/todos/:taskId', async (req, res) => {
    const theId = parseInt(req.params.taskId, 10);
    // convert 
    const oneTodos = await Todo.getOne(theId);
    // oneTodos.then((data) => {
    //     console.log('specific task');
        // console.log(req.params.taskId);
        // const dataJSON = JSON.stringify(data);
        // res.end(dataJSON);
        res.json(oneTodos);
    // });
});



// console.log(req.params.taskId);
// server.listen(3000);
// Replace with app.listen(port, function())





// Getting users
app.get('/users', async (req, res) => {
    const allUsers = await User.getAll();
    // allUsers.then ((data) => {
        res.json(allUsers);
    // });
});




app.get('/users/:userID', (req, res) => {
    const theId = parseInt(req.params.userID, 10);
    const oneUser = User.getOne(theId);
    // oneUser.then ((data) => {
        res.json(oneUser);
    // });
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`));