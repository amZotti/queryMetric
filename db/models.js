var db = require('./modelAdapter.js');
var helper = require('./helpers.js');

afterRangeMetric = function(afterTarget, afterDate) {
  return db.where('metrics', '>', [afterTarget, afterDate]);
}

beforeRangeMetric = function(beforeTarget, beforeDate) {
  return db.where('metrics', '<', [beforeTarget, beforeDate]);
}

//Syntax:
//exports.processRequest(filter_date, afterOrBefore, date, aggregate, aggregate_target)

//Example:
//exports.processRequest('start_date', 'after', '2010', 'sum', 'value').then(function(result) {
//  console.log(result);
//});

exports.processRequest = function(filter, afterOrBefore, date, aggregate, aggregateTarget) {
  var queryPromise, aggregateFunction;

  if (!(filter === 'start_date' || filter === 'end_date' || filter === 'value')) {
    return 'bad query';
  }

  if (!helper.isInt(date)) {
    return 'bad query';
  }

  if (aggregate === 'sum') {
    aggregateFunction = helper.sum;
  }  else if (aggregate === 'count') {
    aggregateFunction = helper.count;
  } else if (aggregate === 'avg') {
    aggregateFunction = helper.avg;
  } else {
    return 'bad query';
  }

  if (afterOrBefore === 'after') {
    queryPromise = afterRangeMetric(filter, date);
  } else if (afterOrBefore === 'before') {
    queryPromise = beforeRangeMetric(filter, date);
  } else {
    return 'bad query';
  }

  return queryPromise.then(function(result) {
    return aggregateFunction(result, aggregateTarget);
  });
};

//exports.processRequest('start_date', 'after', '2010', 'sum', 'value').then(function(result) {
//  console.log(result);
//});
