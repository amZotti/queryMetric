var db = require('./modelAdapter.js');
var helper = require('./helpers.js');

//Syntax:
//exports.processRequest(filter_date, range, date, aggregate, aggregate_target)

//Example:
//exports.processRequest('start_date', 'after', '2010', 'sum', 'value').then(function(result) {
//  console.log(result);
//});

var validFilter = function(filter) {
  return filter === 'start_date' || filter === 'end_date' || filter === 'value';
};

var validDate = function(date) {
  return helper.isInt(date);
};

var validAggregate = function(aggregate) {
  return aggregate === 'sum' || aggregate === 'count' || aggregate === 'avg';
};

var validRange = function(range) {
  return range === 'after' || range === 'before';
};

var validInput = function(filter, range, date, aggregate, aggregateTarget) {
  return validFilter(filter) &&
    validFilter(aggregateTarget) &&
    validRange(range) &&
    validDate(date);
};

exports.processRequest = function(filter, range, date, aggregate, aggregateTarget) {
  var queryPromise, aggregateFunction;

  if (!validInput(filter, range, date, aggregate, aggregateTarget)) { 
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

exports.processRequest('end_date', 'before', '2028', 'count', 'value').then(function(result) {
  console.log(result);
});
