const http = require('http');
const Todo = require('./models/Todo');

const server = http.createServer((req, res) => {
    console.log('you have a request!');
    const allTodos = Todo.getAll();
    allTodos
        .then((data) => {
            console.log("OMG IT'S DATAZZZ")
            console.log(data);
            const dataJSON = JSON.stringify(data);
            res.end(dataJSON);
        });
});
console.log(server);
server.listen(3000);