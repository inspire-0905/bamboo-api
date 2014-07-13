/*
 * mysql connector
 */
var mysql = require("mysql");
var config = require("../../config/config.json");

var dbPool = mysql.createPool(config.database);

module.exports = dbPool;
