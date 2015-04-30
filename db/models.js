var db = require('./modelAdapter.js');
var helper = require('./helpers.js');
var validations = require('./validations.js');

//Syntax:
//exports.processRequest({filter_date, range, date, aggregate, aggregate_target})

exports.processRequest = function(req) {

  if (!validations.validateInput(req)) {
    return new Promise(function(resolve) {
      resolve('bad query');
    });
  }

  var aggregateFunction = helper[req.aggregate];

  return helper[req.range](req.filter, req.date)
    .then(function(result) {
      return aggregateFunction(result, req.aggregateTarget);
    });
};

/*
//Test Case

var req = {
  filter: 'start_date',
  range: 'before',
  date: '2028',
  aggregate: 'count',
  aggregateTarget: 'value'
};

exports.processRequest(req).then(function(result) {
  console.log(result);
});
*/
