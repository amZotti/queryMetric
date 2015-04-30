var db = require('./modelAdapter.js');
var helper = require('./helpers.js');
var validations = require('./validations.js');

//Syntax:
//exports.processRequest(filter_date, range, date, aggregate, aggregate_target)

//Example:
//exports.processRequest('start_date', 'after', '2010', 'sum', 'value').then(function(result) {
//  console.log(result);
//});

exports.processRequest = function(filter, range, date, aggregate, aggregateTarget) {
  var queryPromise, aggregateFunction;

  if (!validations.validateInput(filter, range, date, aggregate, aggregateTarget)) { 
    return new Promise(function(resolve) {
      resolve('bad query');
    });
  }

  aggregateFunction = helper[aggregate];
  queryPromise = helper[range](filter, date);

  return queryPromise.then(function(result) {
    return aggregateFunction(result, aggregateTarget);
  });
};

exports.processRequest('start_date', 'before', '2028', 'count', 'value').then(function(result) {
  console.log(result);
});
