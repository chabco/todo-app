// 1. Collect and prep ingredients
const db = require('../db');


// 2. Cook
async function getAll() {
try {
    const allUsers = await db.any(`select * from users`)
    // .catch((error) => {
    //     console.log('Error getting users.');
    //     console.log(error);
    // });
    return allUsers;
} catch (error) {
    console.log('error');
    console.log(error);
}
};


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

// 3. Serve
module.exports = {
    getAll,
    getOne
};