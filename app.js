var socket = io('localhost:3000');


// creates a google map centered at hack reactor
function initialize() {
  var mapOptions = {
    center: new google.maps.LatLng(37.783544, -122.408942),
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  
        var inBetween = function inBetween (upperBound, lowerBound, test) {
          if (test < upperBound && test > lowerBound) {
            return true;
          }
          return false;
        }
  google.maps.event.addListener(map, 'idle', function () {
    var boundsObj = map.getBounds().toString().match(/[^() ]/g).join('').split(',');

    boundsArr = [boundsObj[1], boundsObj[0], boundsObj[3], boundsObj[2]];

    socket.emit('bounds', boundsArr);
    socket.on('tweet', function (tweet) {
      if (inBetween(boundsArr[3],boundsArr[1], tweet.geo.coordinates[0]) && inBetween(boundsArr[2],boundsArr[0], tweet.geo.coordinates[1])) {
        console.log(tweet);
        return new google.maps.Marker({
          position: {
            lat: tweet.geo.coordinates[0],
            lng: tweet.geo.coordinates[1]
          }, 
          map: map,
          animation: google.maps.Animation.DROP
        }); 
      }

    })

  });
  
  // new google.maps.Marker({position: {lat: 37.783544, lng: -122.408942}, map: map}); 
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