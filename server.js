// Dependencies
var express = require("express");
// Initialize Express
var app = express();
// var request = require("request");
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");

//handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }))
app.set("view engine", "handlebars");



// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));


// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/healthScrapedb");
// Import routes and give the server access to them.
var routes = require("./controllers/article_controller.js");

app.use(routes);

var PORT = 3000;    
// Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });