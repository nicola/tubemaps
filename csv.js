var async = require('async');
var fs = require('fs');
var CSVStream = require('csv-streamify');
var __ = require('highland');

exports.readCSV = function (file, cb) {
  __(fs
    .createReadStream(file)
    .pipe(CSVStream({objectMode: true, columns: true})))
    .errors(cb)
    .collect()
    .apply(function(lines) {
      cb(null, lines);
    });
};

exports.readCSVs = function (opts, cb) {
  async.map(
    [
      opts.connections,
      opts.lines,
      opts.stations
    ],
    exports.readCSV,
    cb);
};