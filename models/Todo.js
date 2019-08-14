// When you want one and only one, use the .one() method.
// That way, if you don't find it, it triggers the catch().
// This is better than doing an if/else inside your .then().
// .one() whill throw an exception if it gets anything but one and only one result.


const db = require('../db');

function getAll() {
    return db.any(`
        select * from todos
        `)
    // .then((data) => {
    //     console.log('here is the data:');
    //     console.log(data);
    // })
    .catch((error) => {
        console.log('ruh roh....');
        console.log(error);
    });
};

function getOne(id) {
    db.any(
        `
        select * from todos where id=$1
        `, [id])
    .then((data) => {
        console.log('here is the data:');
        console.log(data);
    })
    .catch((error) => {
        console.log('ruh roh....');
        console.log(error);
    });
};


module.exports = {
    // This is the same as
    // getAll: getAll,
    getAll,
    getOne
}