// const http = require('http');
// replace with express
const express = require('express');
const Todo = require('./models/Todo');

// Create the server and call it "app"
const app = express();
// Create a variable for the port#
const port = 3000;

// const server = http.createServer((req, res) => {
// Replace with app.get()
app.get('/todos', (req, res) => {

    // "debugger" keyword adds a programmatic breakpoint for the Chrome Dev Tools:

    // debugger;

    console.log('you have a request!');
    const allTodos = Todo.getAll();
    allTodos
        .then((data) => {
            console.log("OMG IT'S DATAZZZ")
            console.log(data);
            // const dataJSON = JSON.stringify(data);
            // res.end(dataJSON);
            res.json(data);
        });
});

app.get('/todos/:taskId', (req, res) => {
    const theId = parseInt(req.params.taskId, 10);
    // convert 
    const oneTodos = Todo.getOne(theId);
    oneTodos.then((data) => {
        console.log('specific task');
        // console.log(req.params.taskId);
        // const dataJSON = JSON.stringify(data);
        // res.end(dataJSON);
        res.json(data);
    });
});

// console.log(req.params.taskId);
// server.listen(3000);
// Replace with app.listen(port, function())

app.listen(port, () => console.log(`Example app listening on port ${port}!`));