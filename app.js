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

    // var coords = boundsObj.toString().match(/[^()]/g);

    // var coords = [boundsObj.Ba.j, boundsObj.ra.j, boundsObj.Ba.k, boundsObj.ra.k];
    // var botRight = '(' + boundsObj.Ba.j + ', ' + boundsObj.ra.j + ')';
    // var topLeft = '(' + boundsObj.Ba.k + ', ' + boundsObj.ra.k + ')';

    // console.log('top left: ', topLeft, 'bottom right: ', botRight);
    console.log('here: ',boundsObj);

    socket.emit('bounds', boundsObj);

    new google.maps.Marker({position: {lat: 37.783544, lng: -122.408942}, map: this}); 
  });
  
}
google.maps.event.addDomListener(window, 'load', initialize);


