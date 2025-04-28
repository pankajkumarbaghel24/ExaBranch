const mysql = require('mysql2');
var config=require('config');

var exec = function (query, params,callback) {
  
      if (!query) {
          return callback("Query not found");
      }
      
      var connection = mysql.createConnection({
          host: config.get('db.host'),
          user: config.get('db.user'),
          port:3307,
          password: config.get('db.password'),
          database: config.get('db.database'),
          multipleStatements: true
      });

      connection.connect(function (err) {
          if (err) {
              return callback(err);
          }

          var q=connection.query(query, params, function (err, result) {
              connection.end(); // Close the connection after query execution
              if (err) {return callback(err);}
              return callback(null,result);
          });
      });
 
};

module.exports.exec = exec;
