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
    stream = Twitter.stream('statuses/filter', { locations: coords });
    stream.on('tweet', function (tweet) {
      console.log(tweet.text)
    })
  });
});

