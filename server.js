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
})

app.use(express.static(__dirname + '/'))

app.get('/', function(req, res){
  console.log(__dirname)
  res.sendfile(__dirname + 'maps.html');
});

io.on('connection', function (socket) {
  console.log('a user connected!');
  socket.on('disconnect', function (msg) {
    console.log('a user disconnected!')
  })
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

Twitter.get('search/tweets', { q: 'coordinates', count: 1, language: 'en' }, function(err, data, response) {
  console.log('#################  TEXT  #################: \n',data.statuses[0].text);
  console.log('#################  COORDINATES  #################: \n',data.statuses[0].coordinates);
})