// 1. Collect and prep ingredients
const db = require('../db');


// 2. Cook
async function getAll() {
    const users = await db.any(`select * from users`);

    const arrayOfPromises = users.map(async user => {
        const userTodos = await db.any(`select * from todos where user_id = $1`, [user.id]);
        user.todos = userTodos;
        return user;
    });

    const arrayOfUsersWithTodos = await Promise.all(arrayOfPromises);

    return arrayOfUsersWithTodos;
}
// async function getAll() {
// try {
//     const allUsers = await db.any(`select * from users`)
//     // .catch((error) => {
//     //     console.log('Error getting users.');
//     //     console.log(error);
//     // });
//     return allUsers;
// } catch (error) {
//     console.log('error');
//     console.log(error);
//     return [];
// }
// };


// What we want
// {
//     id: 1,
//     displayname: 'alfred',
//     username: 'theButler',
//     todos: [
//         {id: 1, task}
//         {}
//         {}
//     ]
// }

async function getOne(id) {
try {
    const user = await db.one(`select * from users where id=$1`, [id]);

    const todosForUser = await db.any(`select * from todos where user_id=$1`, [id])

    user.todos = todosForUser;
    return user;
} catch (error) {
    console.log("No user found!");
    return {
        id: 0,
        displayname: 'No user found'
    };
};

    // return db.one(`select * from users where id=$1`, [id]);
    // .then((user) => {
    //     // get todos for this user
    //     return db.any(`select * from todos where user_id=$1`, [id])
    //     .then((todosForUser) => {
    //         console.log(todosForUser);
    //         user.todos = todosForUser;
    //         return user;
    //     });
    // })
    // .catch((error) => {
    //     console.log('Error getting user.');
    //     console.log(error);
    // });

};


// Accept an object argument so we have flexibility later on.
// That is, we can add more database columns without having to update all of our functions
async function createUser(userDataObj) {
    const { displayname, username } = userDataObj;
    const newUserInfo = await db.one (
        `insert into users (displayname, username) values($1, $2) returning id`, [displayname, username]);

    console.log(newUserInfo);
    return newUserInfo
};

// createUser({
//     displayname: "sak",
//     username: "skrnkd"
// });


async function createTask(taskDataObj, urlID) {
    const { priority, task } = taskDataObj;
    const newTaskInfo = await db.one (
        `insert into todos (priority, task, user_id) values ($1, $2, $3) returning id`, [priority, task, urlID]);

        console.log(newTaskInfo);
        return newTaskInfo
}

// 3. Serve
module.exports = {
    getAll,
    getOne,
    createUser,
    createTask
};