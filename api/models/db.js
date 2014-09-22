/*
 * mysql connector
 */
var mysql = require("mysql");
var config = require("../../config/dev.json");

var dbPool = mysql.createPool(config.database);

module.exports = dbPool;
