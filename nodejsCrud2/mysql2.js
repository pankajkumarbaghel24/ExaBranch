const mysql = require('mysql2');

const pool=mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3307,
    password:"Pankaj*24",
    database:"studentform"
});


module.exports = pool.promise();