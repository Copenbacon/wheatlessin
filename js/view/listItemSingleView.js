'use strict';
function listItem() {
  $('.restaurant-display').on('click', function(){
    var index = $(this).index();
    console.log(index, 'index of this element');
    $('#map').show();
    renderSingleResultMap(index);
  });
}

var renderSingleResultMap = function(e) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: businessesArray[e].location.coordinate.latitude, lng: businessesArray[e].location.coordinate.longitude},
    zoom: 15
  });

  var coordinates = {
    lat:businessesArray[e].location.coordinate.latitude,
    lng:businessesArray[e].location.coordinate.longitude
  };

  var marker = new google.maps.Marker({
    position: coordinates,
    map: map
  });

};
