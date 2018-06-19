// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var axios = require("axios");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scrapedb";
var collections = ["scrapedData"];
