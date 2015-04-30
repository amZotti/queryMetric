var db = require('./config');

// insert(string, object)
exports.insert = function(table, data) {
  return new Promise(function(resolve, reject) {
    var query = 'INSERT INTO ?? SET ?';
    var params = [table, data];
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

//selectAll(string tableName)
exports.selectAll = function(table) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM ??';
    db.connection.query(query, table, function(err, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(fields);
      }
    });
  });
};

//filters is an array of key value pairs
//filters follows this structure:
// -- [key1, value1, key2, value2 ...etc]
// where(string tableName, [string key1, string value1])
exports.where = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM ?? WHERE ?? = ?';
    var params = ([table]).concat(filters);
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

//filters is an array of key value pairs
//filters follows this structure:
// -- [key1, value1, key2, value2 ...etc]
// where(string tableName, [string key1, string value1])
exports.whereParams = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var query = 'SELECT * FROM ?? WHERE ?? = ?';
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

//update(string tableName, [string key1, string value1, string key2, string value2]);
exports.update = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'UPDATE ?? SET ?? = ? WHERE ?? = ?';
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};

//deleteRow(string tableName, [string key, string value]);
exports.deleteRow = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'DELETE FROM ?? WHERE ?? = ?';
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection);
      }
    });
  });
};


//deleteRow(string tableName, [string key, string value]);
exports.deleteRowWhere = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'DELETE FROM ?? WHERE ?? = ?';

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

//retrieveCount(string tableName, [string key, string value])
exports.retrieveCount = function(table, filters) {
  return new Promise(function(resolve, reject) {
    var params = ([table]).concat(filters);
    var query = 'SELECT COUNT(*) FROM ?? WHERE ?? = ?';
    db.connection.query(query, params, function(err, connection) {
      if (err) {
        reject(err);
      } else {
        resolve(connection[0]["COUNT(*)"]);
      }
    });
  });
};

/* 
 * Example Usage:
 
 exports.where('metrics', ['metric_id', '15']).then(function(result) {
   console.log(result);
 });

*/

