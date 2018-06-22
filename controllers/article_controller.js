var mongoose = require("mongoose");
var express = require("express");
var db = require("../models/");
var router = express.Router();
var axios = require("axios");
// Require request and cheerio. This makes the scraping possible
var cheerio = require("cheerio");

// // Require all models
var db = require("../models");

router.get("/", function (req, res) {
    db.Article.find().then(function (articles) {
        res.render("index", { articles: articles });
    })

})

router.get("/scraped", function (req, res) {

    axios.get("https://www.healthline.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        console.log(response)

        $("li.css-oo0le1").each(function (i, element) {
            var result = {}
            // result.title = $(this).children(".css-1ez643w").text();
            // result.link = $(this).children(".css-1ez643w").attr("href");
            var link = $(element).find(".css-1ez643w").attr("href");
            var title = $(element).find(".css-1ez643w").text();
            result = {
                link: link,
                title: title
            }

            console.log("result", result)
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

        res.send("Scrape Complete");
        res.json(dbArticle);
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

            res.json(err);
        });
})

//Saving the Favorites Articles
// router.post("/savedArticles/:id", function(req, res){
// 	console.log("test1 if the function is working")

// });

// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//add note to each article
router.post("/articles/:id", function (req, res) {
    console.log("test2 if the function is working")
    db.Note.create(req.body).then(function (dbNote) {
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
        .then(function (dbArticle) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbArticle);
        })
        .catch(function (err) {

            res.json(err);
        });

});

//delete/unsaved the saved article



module.exports = router;