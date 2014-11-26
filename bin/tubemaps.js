#!/usr/bin/env node

var Maps = require('../maps');


var parser = require("nomnom");
parser.command('path')
  .option('from', {
    help: "From this station",
  })
  .option('to', {
    help: "To this station",
  })
  .option('line', {
    help: "On this line",
  })
  .callback(function(opts) {
    Maps('london', function(err, tube) {
      var from = tube.getStationByName(opts.from);
      var to = tube.getStationByName(opts.to);
      var line = tube.getLineByName(opts.line);
      var path = tube.path(from, to, line);
      console.log(path.map(function(d) {
        return  tube.getLine(d.station1.line).name + ": " + d.station1.name + " to " + d.station2.name;
      }).join('\n'))
    });
  })
  .help("Search messages with particular");


parser.parse();