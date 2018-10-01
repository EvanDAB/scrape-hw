var mongojs = require("mongojs");                       //express, ejs, mongojs, body-parser, cheerio, request
var express = require('express');                       //      ch  ch       ch          nch       ch       ch
var cheerio = require("cheerio");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();

app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

var databaseUrl = "gamespot";
var collections = ["articles"];

// Use mongojs to hook the database to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
    console.log("Database Error:", error);
});

console.log("\n***********************************\n" +
            "Grabbing every thread name and link\n" +
            "from gamespot's homepage:" +
            "\n***********************************\n");

app.get('/scrape', function(req, res) {
    request("https://gamespot.com/", function(error, response, html) {

        var $ = cheerio.load(html);

        $("div.media-body").each(function(i, element){
            var title = $(element).children("h3.media-title").text();
            var url = $(element).parent().attr('href');
            var summary = $(element).children('p.media-deck').text();
            var picUrl = $(element).parent().find('img').attr('src');

            if(title && url && summary && picUrl) {
                db.articles.insert({
                    title: title,
                    summary: summary,
                    url: url,
                    picUrl: picUrl
                },
                function(err, inserted){
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log(inserted);
                    }
                })
            }
        }); 
    });
    res.send('Scrape Complete');
})

// Retrieve data from the db
app.get("/all", function(req, res) {
    // Find all results from the scrapedData collection in the db
    db.articles.find({}, function(error, found) {
      // Throw any errors to the console
        if (error) {
            console.log(error);
        }
        // If there are no errors, send the data to the browser as json
        else {
            res.json(found);
        }
    });
  });

app.get('/', function(req, res) {
    res.render('pages/index');
})

app.post('/post-comment', function(req, res){
    console.log(req.body.title);
    console.log('Username: ' + req.body.username);
    console.log('Username: ' + req.body.comment);

    //PSUEDOCODE
    // take in the request of the username and comment input as well as the name of the article
    // var username = req.body.username
    // var title = req.body.title
    // var comment = req.body.comment
    //  update that info to the database, and take in the article name to insert it
    // db.articles.find({"article_name": req.body.title}).insert({ $set(
    //     username : username,
    //     comment: comment,
    //     )
    //   
    // })
    res.redirect("/");
})

//PSUEDOCODE
//Would be used to find the all of the comments for that section
// app.get('/comment', function(req, res){
//     db.articles.find({name: req.body.title}, function(error, found) {
//         // Throw any errors to the console
//           if (error) {
//               console.log(error);
//           }
//           // If there are no errors, send the data to the browser as json
//           else {
//               res.json(found);
//           }
//       });
// })
app.listen(3000, function(){
    console.log('Running');
});
