#!/usr/bin/env node
var readCSVs = require('../csv').readCSVs;
var fs = require('fs');
var nomnom = require('nomnom');
var datasets = require("./");

Object.keys(datasets).forEach(function(dataset) {
  readCSVs(datasets[dataset].csv, function(err, csvs) {

    var file = __dirname + '/' + dataset+'.json';
    var data = JSON.stringify({
      connections: csvs[0],
      lines: csvs[1],
      stations: csvs[2]
    });

    fs.writeFile(file, data, function(err, res) {
      console.log(err, res);
    });

  });

});
