var express = require("express");
var db = require("../models/");
var router = express.Router()
var mongoose = require("mongoose")
var axios = require("axios");
// Require request and cheerio. This makes the scraping possible
var cheerio = require("cheerio");

// // Require all models
var db = require("../models");

router.get("/", function (req, res) {
    res.render("index");
})

router.get("/scraped", function (req, res) {
    anxios.get("https://www.healthline.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("li.css-oo0le1").each(function (i, element) {
            var result = {}
            result.title = $(this).children(".css-1ez643w").text();
            result.link = $(this).children(".css-1ez643w").attr("href");

            // Create a new Article using the `result` object built from scraping
            //save the data in mongo
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, send it to the client
                    return res.json(err);
                });
        })
        //i should change this part????????????????????????????????????????
        //?????????????????????
        res.send("Scrape Complete");
    })
})

//getting all the articles from the db
router.get("/articles", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({}).then(function (dbArticle) {
        //send them back to the user
        res.json(dbArticle)
    })
    .catch(function (err) {
    // If an error occurred, send it to the client
        res.json(err);
    });
})



module.exports = router;