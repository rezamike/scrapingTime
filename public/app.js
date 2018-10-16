// Grab the articles as a json
$.getJSON("/movies", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#movies").append("<p class='title' data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "<a href='https://www.imdb.com" + data[i].link + "'></p>" + "<img class='poster' src=" + data[i].image + ">");
    }
  });
  
  
  // Whenever someone clicks a p tag
  $(".title").on("click", function() {
    // Empty the notes from the note section
    $("#ratings").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/movies/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#ratings").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#ratings").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#ratings").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#ratings").append("<button data-id='" + data._id + "' id='saverating'>Save Rating</button>");
        $("#ratings").append("<button data-id='" + data.note._id + "' id='deleterating'>Delete Rating</button>");
  
  
        // If there's a note in the article
        if (data.rating) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.rating.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.rating.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#saverating", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/movies/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#ratings").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  
  // When you click the deletenote button
  $(document).on("click", "#deleterating", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    console.log(thisId);
  
    // Run a GET request to delete the note
    $.ajax({
      method: "DELETE",
      url: "/movies/" + thisId,
      
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#ratings").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });