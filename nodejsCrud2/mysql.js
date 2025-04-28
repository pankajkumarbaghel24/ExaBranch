// var mysql = require('mysql');
const mysql = require('mysql');
var config = require('config');

var exec = function (query, params, callback) {
  if (!query) {
    return callback("Query not found");
  }
  var connection = mysql.createConnection({
    host: config.get('db.host'),
    user: config.get('db.user'),
    port:3307,
    password: "Pankaj*24",
    database: "mycrud",

    multipleStatements: true
  });

  connection.connect(function (err) {
    if (err) {
      return callback(err);

    }

    var q = connection.query(query, params, function (err, results) {
      connection.end();
      if (err) { return callback(err); }
      return callback(null, results);
    });

  });
};

module.exports.exec = exec;