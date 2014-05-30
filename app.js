var socket = io('localhost:3000');


// creates a google map centered at hack reactor
function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(37.783544, -122.408942),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  
  google.maps.event.addListener(map, 'bounds_changed', function () {
    var boundsObj = this.getBounds().toString().match(/[^() ]/g).join('').split(',');
    boundsObj = [boundsObj[1], boundsObj[0], boundsObj[3], boundsObj[2]];

    socket.emit('bounds', boundsObj);
    socket.on('tweet', function (tweet) {
      console.log(tweet.text);
      new google.maps.Marker({
        position: {
          lat: tweet.get.coordinates[0],
          lng: tweet.get.coordinates[1]
        }, 
        map: map,
        animation: 'BOUNCE'
      }); 
    })

  });
  
  new google.maps.Marker({position: {lat: 37.783544, lng: -122.408942}, map: map}); 
}
google.maps.event.addDomListener(window, 'load', initialize);


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