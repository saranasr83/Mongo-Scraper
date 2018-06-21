
("#scrapenewarticle").on("click", function (event) {
    event.preventDefault()
    //grab articles as a json
    $.getJSON("/articles", function (data) {
        for (i = 0; i < data.length; i++) {
            console.log("the data tha we get from articles: ", data)
            //display info on the page
            $("#newarticles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>")
        }
    })
})


