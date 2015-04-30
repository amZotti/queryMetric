DROP DATABASE IF EXISTS test;
CREATE DATABASE test;

USE test;

CREATE TABLE metrics (
  id int(5) AUTO_INCREMENT,
  PRIMARY KEY (id),
  start_date int(5),
  time_range_length int(5),
  value int(5),
  last_calculated_at int(5),
  end_date int(5)
);
