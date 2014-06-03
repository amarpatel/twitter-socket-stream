var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Twit = require('twit');
var Twitter = new Twit({
    consumer_key:         'EtRmi7t2pHyHGsq6ikBBeZY1L',
    consumer_secret:      'isC8Dwk0tRH37jWpWBSTVsbOOF0V02W2WKgkez3kgIC8gYIhNo',
    access_token:         '14381844-TdZjy34coQj44W0BAUThr20Z4UiK0qndP5sGzZwOS',
    access_token_secret:  'y7wfznVC3K0sYpy8QjurkV2GWDsZngFnZ5CtpFcfUTndI'
});

app.use(express.static(__dirname + '/'))

app.get('/', function(req, res){
  console.log(req.method)
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var stream;

io.sockets.on('connection', function (socket) {
  socket.on('bounds', function (coords) {
    console.log(coords)
    stream = Twitter.stream('statuses/filter', { locations: coords });
    stream.on('tweet', function (tweet) {
      if (!!tweet.geo) {
        console.log(tweet);
        socket.emit('tweet', tweet);        
      }
    })
  });
});


/*

tweet keys:
[ 'created_at',
  'id',
  'id_str',
  'text',
  'source',
  'truncated',
  'in_reply_to_status_id',
  'in_reply_to_status_id_str',
  'in_reply_to_user_id',
  'in_reply_to_user_id_str',
  'in_reply_to_screen_name',
  'user',
  'geo',
  'coordinates',
  'place',
  'contributors',
  'retweet_count',
  'favorite_count',
  'entities',
  'favorited',
  'retweeted',
  'filter_level',
  'lang' ]



*/