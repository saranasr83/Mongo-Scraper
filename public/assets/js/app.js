$(document).ready(function () {

    //scraping the new articles button
    $("#scrapenewarticle").on("click", function (event) {
        event.preventDefault()
        console.log("the scrape button is working")
        //get the scraped data 
        $.get("/scraped", function () {

            //grab articles as a json
            $.getJSON("/articles", function (data) {
                console.log("the data tha we get from articles: ", data)
                // replace url with "/" which will cause a page refresh
                window.location.replace("/");
            })
        })
    });

    //click event for saving the article
    // update article save status
    $(document).on("click", ".save-the-article", function(){
        var updateArticle = {
            saved: true
        }
        // console.log($(this).data("saved"));
        if($(this).data("saved") === "true" || $(this).data("saved") === true){
            updateArticle.saved = false
        }
        
        var id = $(this).parent().data("id");
        ///
        console.log(updateArticle);

        $.ajax({
            url: '/update/article/' + id,
            type: 'PUT',
            data: updateArticle
        }).then(function(result){
            // refresh the page
            if(result === true){
                window.location.reload(true);
            }
            else {
                alert("oops, something went wrong. refresh and try again.")
            }    
        });
    });



    //click event for add note
    $(".add-note").on("click", function (event) {
        event.preventDefault();

        $(".modal-body").empty();

        // Save the id from the p tag
        var thisId = $(this).parent().data("id");

        // Now make an ajax call for the Article
        $.ajax({
            method: "GET",
            url: "/note/article/" + thisId
        })
            // With that done, add the note information to the page
        .then(function(data) {
            if(data.article.note !== undefined){
                var note = $("<div>").addClass("card");
                var noteBody = $("<div>").addClass("card-body note-body").attr("data-note", data.article.note["_id"]).attr("data-article", data.article["_id"]);
                var text = $("<p>").text(data.article.note.body);
                var button = $("<button>").addClass("btn btn-primary delete-note").text("Delete");
                $(noteBody).append(text, button); 
                $(note).append(noteBody); 

                $(".modal-body").append(note, newNote);
                
                $("#noteModal").modal("show");
            }
            else {
                console.log("no note")
                var newNote = $("<div>").addClass("card");
                var newNoteBody = $("<div>").addClass("card-body note-body").attr("data-article", data.article["_id"]);
                var form = "<div class='form-group'><label>add note</label><textarea class='form-control note-body' placeholder='input your note here'></textarea></div>"
                var saveButton = $("<button>").addClass("btn btn-primary save-note").text("save note");
               
                $(newNoteBody).append(form, saveButton); 
                $(newNote).append(newNoteBody); 

                $(".modal-body").append(newNote);
                $("#noteModal").modal("show");
            }

            });

    })

    $(document).on("click", ".save-note", function(){
        var newNote = {
            body: $("textarea.note-body").val().trim()
        }
        var articleID = $(this).parent().data("article");
        console.log("id",articleID)
        console.log("note",newNote);
        if(newNote.body.length > 0){
            $.ajax({
                url: '/note/article/' + articleID,
                type: 'POST',
                data: newNote
            }).then(function(data){
                console.log(data);
                $("#noteModal").modal("hide");
            })
        }
        
        

        // article id
        // note-body
        // make a post request
    });

    $(document).on("click", ".delete-note", function(){
        // get article id
        // note id
        // make a delete request
    });
})
