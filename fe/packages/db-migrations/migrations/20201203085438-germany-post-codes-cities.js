"use strict";

var dbm;
var type;
var seed;
var fs = require("fs");
var path = require("path");
var Promise;

const insertSqlFn = require("../germany-post-codes-cities").fetchGermanyPostalCodesCities();
// .then((x) => {
//   console.log(x);
//   return x;
// });

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
  Promise = options.Promise;
};

exports.up = function (db) {
  var filePath = path.join(
    __dirname,
    "sqls",
    "20201203085438-germany-post-codes-cities-up.sql"
  );
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
      if (err) return reject(err);

      console.log("received data: " + data);

      resolve(data);
    });
  }).then(function (data) {
    return insertSqlFn.then((insertSql) => {
      if (insertSql) {
        data += ";" + insertSql;
      }
      return db.runSql(data);
    });

    // return db.runSql(data);
  });
};

exports.down = function (db) {
  var filePath = path.join(
    __dirname,
    "sqls",
    "20201203085438-germany-post-codes-cities-down.sql"
  );
  return new Promise(function (resolve, reject) {
    fs.readFile(filePath, { encoding: "utf-8" }, function (err, data) {
      if (err) return reject(err);
      console.log("received data: " + data);

      resolve(data);
    });
  }).then(function (data) {
    return db.runSql(data);
  });
};

exports._meta = {
  version: 1,
};