require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var req = require("request");
var fs = require('fs');

// Function that makes request to twitter API

function getTweet () {

    var client = new Twitter(keys.twitter);


      var params = {screen_name: 'abdiazizjama3'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {

        for (var i =0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
        }
      });
}
// getTweet();

// Function that makes request to spotify

function getSongs () {

    var spotify = new Spotify(keys.spotify);

     var songName = process.argv[3];

    spotify.search({ type: 'track', query: songName, limit: 1 }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

    console.log(data.tracks.items[0].artists[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].external_urls.spotify);
    });


}

 if (process.argv[2] == "spotify-this-song") {
 getSongs();
}
// Function that makes request to OMBD

function getMovie () {

    var omdbApi = require('omdb-client');

    var params = {
        apiKey: 'XXXXXXX',
        title: 'Terminator',
        year: 2012
    }
    omdbApi.get(params, function(err, data) {
        // process response...
    });
}


// function for running a command from a texfile

function doWhatItSays () {
    fs.readFile('random.txt', 'utf8', function(err, data) {
        if (err) throw err;
        console.log(data);
    });
}

// function for determining what function to run

function determineCommand (command) {
    switch(command) {
        case `my-tweets`:
            console.log('get tweets')
            getTweet();
            break;
        case 'spotify-this-song':
            console.log('this is a song')
            getSongs()
            break;

        case 'movie-this':
            getMovie()
            break;

        case 'do-what-it-says':
            doWhatItSays()
            break;
        default:
            console.log('default')
    }
}

Array.prototype.remove = function(index) {
    this.splice(index, 1);
}

// function that takes in arguments and executes the correct function

function runCommand (command) {
    command.shift();
    command.shift();
    // console.log(command)
    var str = command.join(' ');
    // console.log(str);

    determineCommand(String(command))
}


// execute function that takes in arguments and executes the command

runCommand (process.argv);
