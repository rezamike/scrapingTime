$.getJSON("/movies", function (data) {
    for (let i = 0; i < data.length; i++) {

        var dataImg = data[i].image.replace(/_U[A-Z][1-9][1-9]_CR[0-9],0,45,67_AL_/g,"");
        
        $("#movies").append("<div class='movieRow row d-flex justify-content-between border-bottom'><p class='titleMain font-weight-bold text-left' data-toggle='modal' data-target='#exampleModal' data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "</p><a href='https://www.imdb.com" + data[i].link + "'>" + "<img class='poster' alt='Movie Poster' src='" + dataImg + "'></a></div>");

    }
});


$(document).on("click", ".titleMain", function () {

    $('#exampleModal').modal('show')
    $("#ratings").empty();
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "GET",
        url: "/movies/" + thisId
    })
        .then(function (data2) {
            console.log(data2);
            $("#ratings").append("<h2>" + data2.title + "</h2>");
            $("#ratings").append("<br><input id='titleinput' name='title' ><label for='title'>" + "Please enter your review title" + "</label><br>");
            $("#ratings").append("<br><textarea id='bodyinput' name='body'></textarea><br>");
            $("#ratings").append("<button class='btn btn-primary' data-id='" + data2._id + "' id='saverating'>Save Review</button>");
            $("#ratings").append("<button class='btn btn-primary' data-id='" + data2.rating._id + "' id='deleterating'>Delete Review</button>");

            console.log(data2.rating.title)



            if (data2.rating) {
                $("#titleinput").val(data2.rating.title);
                $("#bodyinput").val(data2.rating.body);
            }
        });
});

$(document).on("click", "#saverating", function () {
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/movies/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
        .then(function (data3) {
            console.log(data3);
            $("#ratings").empty();

            $("#ratings").append("Your rating has been saved!");
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});

$(document).on("click", "#deleterating", function () {
    var thisId = $(this).attr("data-id");

    console.log(thisId);

    $.ajax({
        method: "DELETE",
        url: "/movies/" + thisId,

    })
        .then(function (data4) {
            console.log(data4);
            $("#ratings").empty();
        });

    $("#titleinput").val("");
    $("#bodyinput").val("");
});