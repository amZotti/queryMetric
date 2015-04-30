var helper = require('./helpers.js');

validateFilter = function(filter) {
  return filter === 'start_date' || filter === 'end_date' || filter === 'value';
};

validateDate = function(date) {
  return helper.isInt(date);
};

validateAggregate = function(aggregate) {
  return aggregate === 'sum' || aggregate === 'count' || aggregate === 'avg';
};

validateRange = function(range) {
  return range === 'after' || range === 'before';
};

exports.validateInput = function(req) {
  return validateFilter(req.filter) &&
    validateFilter(req.aggregateTarget) &&
    validateRange(req.range) &&
    validateDate(req.date);
};
