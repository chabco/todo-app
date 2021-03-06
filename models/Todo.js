const db = require('../db');

async function getAll() {
try {
    const allTodos = await db.any(`select * from todos`)
    // .then((data) => {
    //     console.log('here is the data:');
    //     console.log(data);
    // })
    // .catch((error) => {
    //     console.log('ruh roh....');
    //     console.log(error);
    // });
    return allTodos;
} catch (error) {
    console.log('error');
    console.log(error);
    return [];
}
};





async function getOne(id) {
try {
    // When you want one and only one, use the .one() method.
    // That way, if you don't find it, it triggers the catch().
    // This is better than doing an if/else inside your .then().
    // .one() whill throw an exception if it gets anything but one and only one result.
    const oneTodo = await db.one(`select * from todos where id=$1`, [id])
    // .then((data) => {
    //     console.log('here is the data:');
    //     console.log(data);
    // })
    // .catch((error) => {
    //     console.log('ruh roh....');
    //     console.log(error);
    // });
    return oneTodo;
} catch (error) {
    console.log('error');
    console.log(error);
    return {
        id: 0,
        task: 'No tasks found'
    }
}
};




module.exports = {
    // This is the same as
    // getAll: getAll,
    getAll,
    getOne
}