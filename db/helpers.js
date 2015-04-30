exports.sum = function(result, aggregateTarget) {
  var total = 0;
  for (var i = 0;i < result.length;i++) {
    total += result[i][aggregateTarget];
  }
  return total;
};

exports.avg = function(result, aggregateTarget) {
  var total = 0;
  for (var i = 0;i < result.length;i++) {
    total += result[i][aggregateTarget];
  }
  return total / result.length;
};

exports.count = function(result, aggregateTarget) {
  return result.length;
};

exports.isInt = function (value) {
  return !isNaN(value) &&
    parseInt(Number(value)) == value &&
    !isNaN(parseInt(value, 10));
};


