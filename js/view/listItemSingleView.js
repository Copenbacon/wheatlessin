'use strict';
function listItem() {
  $('.restaurant-display').on('click', function(){
    var index = $(this).index();
    console.log(index, 'index of this element');
    $('#mapTwo').show();
    renderSingleResultMap(index);
  });
}

var renderSingleResultMap = function(e) {
  var map = new google.maps.Map(document.getElementById('mapTwo'), {
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

  if(!contentString){
    var contentString = '<div class="content">' +
        '<a href=' + businessesArray[e].url + '>' + businessesArray[e].name + ' </a>' + '<br>' + '<p>' + businessesArray[e].location.display_address + '<p>' + '</div>';

  }

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
};
