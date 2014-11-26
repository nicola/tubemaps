#!/usr/bin/env node

var Maps = require('../maps');


var parser = require("nomnom");
parser.command('path')
  .option('city', {
    help: "What city? e.g. london",
  })
  .option('london', {
    help: "Is london the city?",
    flag: true
  })
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
    var city = opts.city || opts.london ? "london" : false || "london";
    Maps(city, function(err, tube) {

      try {
        
        var from = tube.getStationByName(opts.from);
        var to = tube.getStationByName(opts.to);
        var line = tube.getLineByName(opts.line);
        var path = tube.path(from, to, line);
        console.log(path.map(function(d) {
          return  tube.getLine(d.station1.line).name + ": " + d.station1.name + " to " + d.station2.name;
        }).join('\n'));
      } catch(e) {
        console.log("Are you sure?");
      }
    });
  })
  .help("Get path from one station to another");

parser.command('station')
  .option('city', {
    help: "What city? e.g. london",
  })
  .option('london', {
    help: "Is london the city?",
    flag: true
  })
  .callback(function(opts) {
    var city = opts.city || opts.london ? "london" : false || "london";
    Maps(city, function(err, tube) {

      try {
        var adj = tube.getAdjacent(tube.getStationByName(opts[1]));
        console.log(adj.map(function(d) {
          return tube.getLine(d.line).name + ": "+ d.name;
        }).join("\n"));
      } catch(e) {
        console.log("Are you sure?");
      }
    });
  })
  .help("Get path from one station to another");


parser.parse();