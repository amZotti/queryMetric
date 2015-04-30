var db = require('./config');
exports.where = function(table, operation, filters) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM ?? WHERE ?? ' + operation  + ' ?';
    var params = ([table]).concat(filters);

    for (var i = 1; i < filters.length / 2; i++) {
      query += ' AND ?? = ?';
    }

    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

