// const http = require('http');
// replace with express
const express = require('express');

const Todo = require('./models/Todo');
const User = require('./models/User');
const es6Renderer = require('express-es6-template-engine');

const { sanitizeBody } = require('express-validator');

// Create the server and call it "app"
const app = express();
app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');

// "static assets" like CSS, JS, and images will go in a directory named "public"
app.use(express.static('public'));

// Use the urlencoded middleware to read POST bodies
app.use(express.urlencoded({extended: true}));

app.use((req, res, next) => {
    console.log('I am middleware. yay.');
    console.log(req.url);

    next();
})

// Create a variable for the port#
const port = 3000;

app.get('/', (req, res) => {
    res.render('index', {
        locals: {
            message: 'Welcome to the todos app'
        },
        partials: {
            navbar: 'navbar',
            includes: 'includes'
        }
    });
});

app.get('/profile', (req, res) => {
    res.render('profile', {
        locals: {
            // message: 'alskdfj;'
        },
        partials: {
            navbar: 'navbar',
            includes: 'includes'
        }
    });
});

app.get('/profile/todos', (req, res) => {
    res.render('todos', {
        locals: {
            // message: 'alskdfj;'
        },
        partials: {
            navbar: 'navbar',
            includes: 'includes',
        }
    });
});

// 1. Allow the user to GET the form for creating a todo
app.get('/profile/todos/create', (req, res) => {
    
    // Render the "create new todo" form template
    res.render('create-todo', {
        locals: {
            // message: 'alskdfj;'
        },
        partials: {
            navbar: 'navbar',
            includes: 'includes',
        }
    });
});

// 2. Process the body of the form they POST
app.post('/profile/todos/create', [sanitizeBody('task').escape()], async (req, res) => {
    // Handle the req.body from the "create new todo" form
    console.log(req.body)

    // Normally, we don't include the user id in the form
    // When you log into a site, it keeps track of your id for you.
    req.body.priority = 1;
    const taskID = await User.createTask(req.body, req.body.user_id);
    // res.send(req.body);
});



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

// Post so it doesn't create user after every save
app.post('/users', [sanitizeBody('username').escape(), sanitizeBody('displayname').escape()], async (req, res) => {
    console.log('We got a POST request');
    // .send() is different from .end()
    res.send('good job!');

    console.log('Here is the body: ');
    console.log(req.body);

    const newUserInfo = await User.createUser(req.body);
    console.log(newUserInfo);
    res.json(newUserInfo);
    });

app.post('/users/:userId/todos', async (req,res,) => {
    console.log('Get all todos for one person request..')
    res.send('it works!')
    console.log('Here is the body: ');
    console.log(req.body);
    console.log(req.params);
    const urlID = req.params.userId;

    const newTaskInfo = await User.createTask(req.body, urlID);
    console.log(newTaskInfo);
    // res.json(newTaskInfo);
});


// FIX LATER
app.get('/users/:userId/todos', async (req, res) => {
    const oneUserTodos = await User.getOne();
    // allUsers.then ((data) => {
        res.json(oneUserTodos);
    // });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));