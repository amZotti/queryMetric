var models = require('./db/models.js');
var express = require('express');
var app = express();


//exports.processRequest({target, range, date, aggregate, aggregate_target})

app.get('/*', function (req, res) {
  var params = req.params[0].split('/');

  var query = {
    filter: params[0],
    range: params[1],
    date: params[2],
    aggregate: params[3],
    aggregateTarget: params[4]
  };

  models.processRequest(query).then(function(result) {
    res.send('Result: ' + result);
  });
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
